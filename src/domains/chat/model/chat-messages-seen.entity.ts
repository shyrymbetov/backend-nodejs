import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';
import {ChatMessagesEntity} from "./chat-messages.entity";
import {UserEntity} from "../../user/model/user.entity";



@Entity({schema: env.DB_SCHEMA})
export class ChatMessagesSeenEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => ChatMessagesEntity)
    @JoinColumn()
    chatMessage!: ChatMessagesEntity

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user!: UserEntity

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
