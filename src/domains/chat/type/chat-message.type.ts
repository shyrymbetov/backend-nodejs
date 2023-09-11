import {UserType} from "../../notifications/type/user.type";

export type CreateChatMessageType = {
    chatId: string;
    content?: string;
    user: UserType;
};
