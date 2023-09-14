import {dataSource} from '../../database';
import {NotificationEntity} from "./model/notification.entity";
import {ApplicationEntity} from "../application/model/application.entity";
import {CreateNotificationType} from "./type/notification.type";
import {sendNotificationCount} from "../../sockets/websocket.service";

const notificationRepository = dataSource.getRepository(NotificationEntity);

export async function getNotificationsByUserId(userId: string, filter: any): Promise<NotificationEntity[] | null> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :id', {id: userId})
        .orderBy('createdAt', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getMany();
}

export async function getCountUnreadNotificationsByUserId(userId: string): Promise<number> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :id AND notification.read is false', {id: userId})
        .getCount();
}

export async function getNotificationById(id: string): Promise<NotificationEntity | null> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.id = :id', {id})
        .getOne();
}

export async function createNotification(notification: CreateNotificationType) {
    const newNotification = await notificationRepository.save(notification);
    await sendNotificationCount(notification.userId);

    return newNotification
}

export async function readNotification(id: string) {
    return await notificationRepository.update(id, {
        read: true
    });
}

export async function deleteNotification(id: string) {
    return await notificationRepository.delete(id);
}
