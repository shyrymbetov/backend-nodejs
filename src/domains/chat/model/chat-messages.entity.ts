import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';

import {ChatEntity} from "./chat.entity";
import {UserType} from "../../notifications/type/user.type";
import {UniversityEntity} from "../../university/model/university.entity";
import {ChatMessageFileType} from "../type/chat-message-file.type";

@Entity({schema: env.DB_SCHEMA})
export class ChatMessagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'text', nullable: true})
    content!: string;

    @Column({ type: 'json', nullable: true})
    user!: UserType;

    @Column('uuid')
    chatId!: string

    @ManyToOne(() => ChatEntity, university => university.messages)
    @JoinColumn({ name: 'chat_id' }) // Correct the join column name to 'universityId'
    chat!: ChatEntity;

    @Column({type: "json", nullable: true})
    file!: ChatMessageFileType;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;

    seen: boolean = false;
}
