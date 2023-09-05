import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, OneToMany, JoinColumn, OneToOne, ManyToOne,
} from 'typeorm';
import {env} from '../../../env';

import {FileType} from "../type/file.type";
import {ChatEntity} from "./chat.entity";
import {UserType} from "../type/user.type";

@Entity({schema: env.DB_SCHEMA})
export class ChatMessagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'text', nullable: true})
    content!: string;

    @Column({ type: 'json' })
    user!: UserType;

    @ManyToOne(() => ChatEntity, university => university.messages)
    @JoinColumn({ name: 'chatId' }) // Correct the join column name to 'universityId'
    chat!: ChatEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
