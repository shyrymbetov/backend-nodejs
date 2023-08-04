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
import {UserEntity} from "../../user/model/user.entity";
import {ChatEntity} from "../../chat/model/chat.entity";

@Entity({schema: env.DB_SCHEMA})
export class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => UserEntity, user => user.applications)
    @JoinColumn({ name: 'studentId' }) // Correct the join column name to 'universityId'
    student!: UserEntity;

    @ManyToOne(() => UniversityEntity, university => university.applications)
    @JoinColumn({ name: 'universityId' }) // Correct the join column name to 'universityId'
    university!: UniversityEntity;

    @OneToOne(() => ChatEntity, chat => chat.application)
    chat!: UniversityEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
