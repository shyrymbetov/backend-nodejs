import {WebSocket} from 'ws';
import {isAuthenticated} from "../middlewares/is-authenticated";
import {getCountUnreadNotificationsByUserId} from "../domains/notifications/notification.service";
import {UserType} from "../domains/notifications/type/user.type";
import {getUserById} from "../domains/user/user.service";
import {sendMailMessage} from "../domains/mail/mail.service";
import {createChatMessage, getApplicationUsersByChatId} from "../domains/chat/chat.service";

const userConnections = new Map();

export function addUserOnline(ws: InstanceType<typeof WebSocket.WebSocket>) {
    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message.toString());
        const userId = isAuthenticated(parsedMessage.token)
        if (parsedMessage.type === 'auth-connect') {
            handleUserJoin(ws, userId);
            await sendNotificationCount(userId);
        } else if (parsedMessage.type === 'send_message') {
            broadcastToApplication(userId, parsedMessage).then();
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
    const users = await getApplicationUsersByChatId(message['chatId'])
    if (!users) {
        return;
    }
    //Save Chat Message
    const sender = await getUserType(userId)
    const newChatMessage = {
        chatId: message['chatId'],
        content: message.content,
        user: sender
    }

    await createChatMessage(newChatMessage)

    for (const user of users) {
        await sendMailNotification(userId, message.content)

        if (user == userId) continue;
        await sendToUser(user, JSON.stringify(newChatMessage));
    }
}

async function sendNotificationCount(userId: string) {
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
