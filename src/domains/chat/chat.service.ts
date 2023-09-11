import {dataSource} from '../../database';
import {ChatEntity} from "./model/chat.entity";
import {ApplicationEntity} from "../application/model/application.entity";
import {ChatMessagesEntity} from "./model/chat-messages.entity";
import {CreateChatMessageType} from "./type/chat-message.type";

const chatRepository = dataSource.getRepository(ChatEntity);
const chatMessageRepository = dataSource.getRepository(ChatMessagesEntity);

export async function getChatMessages(chatId: string, filter: any): Promise<ChatMessagesEntity[] | null> {
    return await chatMessageRepository.createQueryBuilder('messages')
        .where('messages.chatId = :chatId', {chatId})
        .orderBy('createdAt', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getMany();
}
export async function createApplicationChat(application: ApplicationEntity) {
    const  newChat = {
        application: application,
        messages: [],
    }
    return await chatRepository.save(newChat)
}

export async function getApplicationUsersByChatId(chatId: string): Promise<(string)[] | null> {
    const chat = await chatRepository
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.application', 'application')
        .leftJoinAndSelect('application.student', 'student')
        .where('chat.id = :id', {chatId})
        .getOne();

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
    return userIds
}

export async function createChatMessage(message: CreateChatMessageType) {
    return await chatMessageRepository.save(message)
}
