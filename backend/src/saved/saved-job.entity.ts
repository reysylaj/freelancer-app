//saved/dto/save-job.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class SavedJob {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    talentId?: number;

    @Column()
    jobId?: number;

    @CreateDateColumn()
    savedAt?: Date;

    @ManyToOne(() => Job, { eager: true, onDelete: 'CASCADE' })
    job?: Job;
}
