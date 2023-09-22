import {dataSource} from '../../database';
import {ChatEntity} from "./model/chat.entity";
import {ApplicationEntity} from "../application/model/application.entity";
import {ChatMessagesEntity} from "./model/chat-messages.entity";
import {CreateChatMessageType} from "./type/chat-message.type";

const chatRepository = dataSource.getRepository(ChatEntity);
const chatMessageRepository = dataSource.getRepository(ChatMessagesEntity);
const applicationRepository = dataSource.getRepository(ApplicationEntity)

export async function getChatMessages(applicationId: string): Promise<ChatMessagesEntity[]> {
    return await chatMessageRepository.createQueryBuilder('messages')
        .leftJoin('messages.chat', 'chat')
        .leftJoin('chat.application', 'application')
        .where('application.id = :applicationId', {applicationId})
        .orderBy('messages.created_at', 'DESC')
        // .skip((filter.page - 1) * filter.size)
        // .take(filter.size)
        .getMany();
}

export async function createApplicationChat(application: ApplicationEntity) {
    const  newChat = {
        application: application,
        messages: [],
    }
    return await chatRepository.save(newChat)
}

export async function getApplicationUsersByChatId(applId: string): Promise<any | null> {
    const chat = await chatRepository
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.application', 'application')
        .leftJoinAndSelect('application.student', 'student')
        .where('application.id = :applId', {applId})
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
    return {
        chatId: chat?.id,
        userIds: userIds
    }
}

export async function createChatMessage(message: CreateChatMessageType) {
    return await chatMessageRepository.save(message)
}
