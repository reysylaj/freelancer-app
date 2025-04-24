// src/projects/projects.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    talentId!: number;

    @Column()
    user!: string;

    @Column()
    profilePicture!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    role!: string;

    @Column('simple-array')
    tools!: string[]; // stored as comma-separated list

    @Column('text', { nullable: true })
    media!: string;

    @Column('simple-array', { nullable: true })
    links!: string[];

    @CreateDateColumn()
    createdAt!: Date;

    //message purpose
    @Column()
    clientId!: number;

}
