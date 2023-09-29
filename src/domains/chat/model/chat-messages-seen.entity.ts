import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne, Unique,
} from 'typeorm';
import {env} from '../../../env';
import {ChatMessagesEntity} from "./chat-messages.entity";
import {UserEntity} from "../../user/model/user.entity";



@Entity({schema: env.DB_SCHEMA})
@Unique('unique_chatMessageId_userId', ['chatMessageId', 'userId'])
export class ChatMessagesSeenEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    chatId!: string

    @Column('uuid')
    chatMessageId!: string

    @Column('uuid')
    userId!: string

}
