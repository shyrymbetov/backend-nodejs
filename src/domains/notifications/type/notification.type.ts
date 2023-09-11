import {UserType} from "./user.type";

export type CreateNotificationType = {
    header?: string;
    content?: string;
    sender: UserType;
    userId: string;
};
