import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import {env} from '../../../env';

@Entity({schema: env.DB_SCHEMA})
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    fileName!: string

    @Column()
    fullPath!: string

    @Column()
    fileFormat!: string

    @Column()
    mime!: string

    @Column()
    size!: number

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deactivatedAt!: Date;
}
