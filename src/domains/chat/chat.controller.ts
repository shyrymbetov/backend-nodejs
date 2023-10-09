import {Request, Response} from 'express';
import {
    getChatMessages,
    createSeenMessage,
    getUnseenMessageCount,
    createChatMessage,
    createChatMessageAndSendWithSocket
} from "./chat.service";
import {CreateSeenMessageSchema} from "./schemas/create-seen-message.schema";
import {CreateChatMessageSchema} from "./schemas/create-chat-message.schema";

export async function getChatMessagesHandler(req: Request, res: Response) {
    let {id} = req.params
    const userId = req.user?.id ?? ''
    return res.send(await getChatMessages(id, userId));
}

export async function createSeenMessageHandler(req: Request, res: Response) {
    const userId = req.user?.id ?? ''
    let {body} = CreateSeenMessageSchema.parse(req)
    const chatMessageSeenType = {
        userId: userId, chatMessageIds: body.chatMessageIds, applicationId: body.applicationId
    }
    return res.send(await createSeenMessage(chatMessageSeenType));
}

export async function getUnseenMessageCountHandler(req: Request, res: Response) {
    const userId = req.user?.id ?? ''
    const applicationId = req.params.applicationId as string
    return res.send(await getUnseenMessageCount(userId, applicationId));
}

export async function createChatMessagesHandler(req: Request, res: Response) {
    const userId = req.user?.id ?? ''
    let {body} = CreateChatMessageSchema.parse(req)
    return res.send(await createChatMessageAndSendWithSocket(userId, body));
}
