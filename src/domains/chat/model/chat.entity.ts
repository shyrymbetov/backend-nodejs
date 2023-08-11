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

    @OneToOne(() => ApplicationEntity, application => application.chat)
    @JoinColumn({ name: 'applicationId' }) // Correct the join column name to 'universityId'
    application!: ApplicationEntity;

    @OneToMany(() => ChatMessagesEntity, message => message.chat)
    messages!: ChatMessagesEntity[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
