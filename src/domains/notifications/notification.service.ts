import {dataSource} from '../../database';
import {NotificationEntity} from "./model/notification.entity";
import {CreateNotificationType} from "./type/notification.type";
import {GetApplicationsParamsDto} from "../application/dto/get-applications-params.dto";

const notificationRepository = dataSource.getRepository(NotificationEntity);

export async function getNotificationsByUserId(userId: string, filter: any): Promise<NotificationEntity[] | null> {

    let {conditionString, conditionParameters} = generateConditionsForMyNotifications(filter, userId)


    return await notificationRepository
        .createQueryBuilder('notification')
        .where(conditionString, conditionParameters)
        .orderBy('created_at', 'DESC')
        // .select("notification.sender->>'fullName'")
        .skip((filter.page - 1) * filter.size)
        .take(filter.size)
        .getMany();
}

function generateConditionsForMyNotifications(filter: any, userId: string) {

    let conditionString = 'true '
    let conditionParameters = {}

    conditionString += "and notification.userId = :id ";
    conditionParameters['id'] = userId;

    if (filter.search) {
        conditionString += ' AND (' +
            'notification.content ILIKE :filterSearch ' +
            'OR notification.sender->>\'fullName\' ILIKE :filterSearch ' +
            'OR notification.sender->>\'university\' ILIKE :filterSearch' +
            ') ';
        conditionParameters['filterSearch'] = `%${filter.search}%`;
    }


    return {
        conditionString: conditionString,
        conditionParameters: conditionParameters,
    };
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
    // Find all unread notifications
    const allUnreadNotifications = await notificationRepository.findBy({ read: false, userId: id });
    // Create an array of IDs for the unread notifications
    const notificationIds = allUnreadNotifications.map(notification => notification.id);
    // Check if there are notifications to update
    if (notificationIds.length === 0) {
        return; // No notifications to update, return 0
    }
    // Update the 'read' status for all unread notifications in a single query
    await notificationRepository.update(notificationIds, { read: true });
    // Optionally, you can return the updated notifications
    return 'Success';
}

export async function deleteNotification(id: string) {
    return await notificationRepository.delete(id);
}
