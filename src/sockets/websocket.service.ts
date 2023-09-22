import {WebSocket} from 'ws';
import {isAuthenticated} from "../middlewares/is-authenticated";
import {createNotification, getCountUnreadNotificationsByUserId} from "../domains/notifications/notification.service";
import {UserType} from "../domains/notifications/type/user.type";
import {getUserById} from "../domains/user/user.service";
import {sendMailMessage} from "../domains/mail/mail.service";
import {getApplicationUsersByChatId, getChatMessages} from "../domains/chat/chat.service";
import {dataSource} from "../database";
import {ChatEntity} from "../domains/chat/model/chat.entity";
import {ChatMessagesEntity} from "../domains/chat/model/chat-messages.entity";

const userConnections = new Map();
const chatRepository = dataSource.getRepository(ChatEntity);
const chatMessageRepository = dataSource.getRepository(ChatMessagesEntity);

export function addUserOnline(ws: InstanceType<typeof WebSocket.WebSocket>) {
    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message.toString());
        const userId = isAuthenticated(parsedMessage.token)
        if (parsedMessage.type === 'auth-connect') {
            handleUserJoin(ws, userId);
            await sendNotificationCount(userId);
        } else if (parsedMessage.type === 'chat_message') {
            console.log('chat_message')
            await broadcastToApplication(userId, parsedMessage)
            await sendNotification(userId, message)
        } else if (parsedMessage.type === 'logout') {
            handleUserClose(ws, userId);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
}

function handleUserJoin(socket, userId: string) {
    userConnections[userId] = socket;
}
function handleUserClose(socket, userId: string) {
    if(userConnections[userId] == socket) {
        userConnections.delete(userId);
    }
}

async function broadcastToApplication(userId: string, message: any) {

    const chat = await getApplicationUsersByChatId(message['applicationId'])
    // If chat doesn't exist, then quit
    if (!chat) {
        return;
    }

    // Save Chat Message to DB
    const sender = await getUserType(userId)
    sender['university'] = message['university']

    const newChatMessage = {
        user: sender,
        chatId: chat['chatId'],
        content: message['content']
    }
    await chatMessageRepository.save(newChatMessage)
    // End Save Chat Message to DB

    message['user']= sender

    for (const user of chat.userIds) {
        // await sendMailNotification(userId, message.content)
        //
        // if (user == userId) continue;
        await sendToUser(user, JSON.stringify(message));
    }
}
async function sendNotification(userId: string, message: any) {

    const chat = await getApplicationUsersByChatId(message['applicationId'])
    //Save Chat Message
    const sender = await getUserType(userId)
    sender['university'] = message['university']
    const newNotification: any = {
        link: message['applicationId'],
        content: message.content,
        user: sender,
    }

    for (const user of chat.userIds) {
        if (user == userId) continue;
        newNotification['userId'] = user
        await createNotification(newNotification)
    }
}

export async function sendNotificationCount(userId: string) {
    const count = await getCountUnreadNotificationsByUserId(userId)
    if (!count) {
        return;
    }
    //This only to front
    await sendToUser(userId, JSON.stringify( {
        type: 'notification',
        count: count,
    }));
}

async function sendToUser(userId: string, message: string) {
    const userSocket = userConnections[userId];
    // console.log(message);
    if (userSocket && userSocket.readyState === WebSocket.OPEN) {
        userSocket.send(message);
    } else {
        await sendNotificationCount(userId)
    }
}

async function getUserType(userId: string): Promise<UserType> {
    const user = await getUserById(userId)
    return {
        id: user?.id,
        email: user?.email,
        fullName: (user?.firstName ?? '') + (user?.lastName ?? ''),
        avatar: user?.avatar,
        role: user?.role
    }
}

export async function sendMailNotification(userId: string, content: string) {
    const recipient = await getUserType(userId)

    //TODO html
    await sendMailMessage({
        to: recipient.email ?? '',
        subject: 'Notification ',
        html: content
    })
}
