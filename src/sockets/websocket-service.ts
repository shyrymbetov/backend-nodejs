import { wss } from '../app';

const chatRoomUsers: { [chatRoomId: string]: string[] } = {};

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());

        if (parsedMessage.type === 'join_chat_room') {
            handleUserJoin(parsedMessage.chatRoomId, parsedMessage.userId);
        } else if (parsedMessage.type === 'leave_chat_room') {
            handleUserLeave(parsedMessage.chatRoomId, parsedMessage.userId);
        } else if (parsedMessage.type === 'send_message') {
            handleUserChatMessage(parsedMessage);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        // Handle WebSocket connection closed event
    });
});

// When a user connects to a chat room
function handleUserJoin(chatRoomId: string, userId: string) {
    if (!chatRoomUsers[chatRoomId]) {
        chatRoomUsers[chatRoomId] = [];
    }

    if (!chatRoomUsers[chatRoomId].includes(userId)) {
        chatRoomUsers[chatRoomId].push(userId);
    }

    notifyUserPresence(chatRoomId);
}

function handleUserLeave(chatRoomId: string, userId: string) {
    if (chatRoomUsers[chatRoomId]) {
        chatRoomUsers[chatRoomId] = chatRoomUsers[chatRoomId].filter(id => id !== userId);
        notifyUserPresence(chatRoomId);
    }
}

function notifyUserPresence(chatRoomId: string) {
    const userPresenceNotification = JSON.stringify({
        type: 'user_presence',
        chatRoomId,
        users: chatRoomUsers[chatRoomId] || [],
    });

    broadcastToChatRoom(chatRoomId, userPresenceNotification);
}

function broadcastToChatRoom(chatRoomId: string, message: string) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            // Implement logic to send the message only to clients in the specified chat room
            // You might need to associate each client with a chat room upon connection
            client.send(message);
        }
    });
}

function handleUserChatMessage(message: any) {
    const chatRoomId = message.chatRoomId;
    const content = message.content;
    const sender = message.sender;

    if (chatRoomUsers[chatRoomId]) {
        const chatMessage = {
            type: 'chat_message',
            chatRoomId,
            content,
            sender,
        };

        broadcastToChatRoom(chatRoomId, JSON.stringify(chatMessage));
    } else {
        // Notify the sender that the recipient is not available
        const notification = {
            type: 'notification',
            message: 'Recipient is not available.',
        };

        sendToUser(sender, JSON.stringify(notification));
    }

    // Save the message to the database (implement part)

    // ...
}
function sendToUser(userId: string, message: string) {
    // const userSocket = /* Find the user's socket based on userId */;
    // if (userSocket && userSocket.readyState === WebSocket.OPEN) {
    //     userSocket.send(message);
    // }
}





