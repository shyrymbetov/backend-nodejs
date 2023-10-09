import {dataSource} from '../../database';
import {ChatEntity} from "./model/chat.entity";
import {ApplicationEntity} from "../application/model/application.entity";
import {ChatMessagesEntity} from "./model/chat-messages.entity";
import {CreateChatMessageType} from "./type/chat-message.type";
import {CreateApplicationDto} from "../application/dto/create-application.dto";
import {ChatMessagesSeenEntity} from "./model/chat-messages-seen.entity";
import {CreateChatMessageSeenType} from "./type/chat-message-seen.type";
import {string} from "zod";
import {broadcastToApplication} from "../../sockets/websocket.service";

const chatRepository = dataSource.getRepository(ChatEntity);
const chatMessageRepository = dataSource.getRepository(ChatMessagesEntity);
const chatMessagesSeenRepository = dataSource.getRepository(ChatMessagesSeenEntity)

export async function getChatMessages(applicationId: string, userId: string): Promise<ChatMessagesEntity[]> {
    const messages = await chatMessageRepository
        .createQueryBuilder('messages')
        .leftJoin('messages.chat', 'chat')
        .leftJoin('chat.application', 'application')
        .where('application.id = :applicationId', { applicationId })
        .orderBy('messages.created_at', 'ASC')
        .getMany();

    const seenMessages = await chatMessagesSeenRepository
        .createQueryBuilder('seen')
        .where('seen.user_id = :userId', {userId: userId})
        .getMany();

    // Create a map of chatMessageId and userId from seenMessages for quick lookup
    const seenMessageMap = new Map();
    seenMessages.forEach((seenMessage) => {
        seenMessageMap.set(seenMessage.chatMessageId, seenMessage.userId);
    });

    // Update the 'seen' attribute in messages based on the seenMessages data
    messages.forEach((message) => {
        if (seenMessageMap.has(message.id)) {
            message.seen = true;
        } else {
            message.seen = false;
        }
    });

    return messages

}

export async function createApplicationChat(application: ApplicationEntity) {
    const  newChat = {
        application: application,
        messages: [],
    }
    return await chatRepository.save(newChat)
}

export async function getApplicationUsersByChatId(applId: string): Promise<any | null> {
    const chat = await getChatByApplicationId(applId)
    const userIds: string[] = []
    if (chat?.application?.studentId) {
        userIds.push(chat?.application?.studentId)
    }
    if (chat?.application?.student.masterId) {
        userIds.push(chat?.application?.student.masterId)
    }
    if (chat?.application?.student.orientatorId) {
        userIds.push(chat?.application?.student.orientatorId)
    }

    return {
        chatId: chat?.id,
        userIds: userIds
    }
}

export async function createSeenMessage(data: CreateChatMessageSeenType) {
    const chat = await getChatByApplicationId(data.applicationId)
    const chatId = chat?.id

    for (let chatMessageId of data.chatMessageIds) {
        const newSeenMessage = {userId: data.userId, chatMessageId: chatMessageId, chatId: chatId}
        await chatMessagesSeenRepository.save(newSeenMessage)
    }
    return {
        status: "Success"
    }
}

export async function getUnseenMessageCount(userId: string, applicationId: string): Promise<string> {

    const chat = await getChatByApplicationId(applicationId)
    const chatId = chat?.id

    // Create a subquery to select chatMessageIds related to the user
    const subquery = chatMessagesSeenRepository
        .createQueryBuilder('chatMessageSeen')
        .select('chatMessageSeen.chatMessageId')
        .where('chatMessageSeen.userId = :userId and chatMessageSeen.chatId = :chatId', { userId: userId, chatId: chatId });

    // Create the main query to count ChatMessages that are not in ChatMessageSeen
    const query = chatMessageRepository.createQueryBuilder('chatMessage')
        .where(`chatMessage.chatId = :chatId and chatMessage.id NOT IN (${subquery.getQuery()})`, { chatId: chatId })
        .setParameters(subquery.getParameters());

    const countUnseenMessages = await query.getCount();

    return countUnseenMessages.toString();
}

async function getChatByApplicationId(applicationId: string) {
    return await chatRepository
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.application', 'application')
        .leftJoinAndSelect('application.student', 'student')
        .where('application.id = :applicationId', {applicationId})
        .getOne();

}

export async function createChatMessageAndSendWithSocket(userId: string, message: any) {
    await broadcastToApplication(userId, message)
    return "Success"
}

export async function createChatMessage(message: CreateChatMessageType) {
    const newMessage = await chatMessageRepository.save(message)
    const newSeenMessage = {userId: newMessage['user']['id'], chatMessageId: newMessage['id'], chatId: newMessage['chatId']}
    await chatMessagesSeenRepository.save(newSeenMessage)
    return newMessage
}
