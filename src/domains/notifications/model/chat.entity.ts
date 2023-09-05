import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';

import {UniversityEntity} from "../../university/model/university.entity";
import {ApplicationEntity} from "../../application/model/application.entity";
import {ChatMessagesEntity} from "./chat-messages.entity";

@Entity({schema: env.DB_SCHEMA})
export class ChatEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToMany(() => ChatMessagesEntity, message => message.chat)
    messages!: ChatMessagesEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
