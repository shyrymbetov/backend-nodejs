import {dataSource} from '../../database';
import {NotificationEntity} from "./model/notification.entity";
import {CreateNotificationType} from "./type/notification.type";

const notificationRepository = dataSource.getRepository(NotificationEntity);

export async function getNotificationsByUserId(userId: string, filter: any): Promise<NotificationEntity[] | null> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :id', {id: userId})
        .orderBy('created_at', 'DESC')
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getMany();
}

export async function getCountUnreadNotificationsByUserId(userId: string): Promise<number> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :userId AND notification.read is false', {userId: userId})
        .getCount();
}

export async function getNotificationById(id: string): Promise<NotificationEntity | null> {
    return await notificationRepository
        .createQueryBuilder('notification')
        .where('notification.id = :id', {id})
        .getOne();
}

export async function createNotification(notification: CreateNotificationType) {
    return await notificationRepository.save(notification)
}

export async function readNotification(id: string) {
    return await notificationRepository.update(id, {
        read: true
    });
}

export async function deleteNotification(id: string) {
    return await notificationRepository.delete(id);
}
