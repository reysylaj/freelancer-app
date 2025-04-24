// saved.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Job } from '../jobs/jobs.entity';
import { Project } from '../projects/projects.entity';
import { User } from '../users/user.entity';

@Entity()
export class Saved {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true })
    jobId?: number;

    @Column({ nullable: true })
    projectId?: number;

    @Column()
    talentId?: number;

    @Column({ nullable: true })
    clientId?: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    savedAt?: Date;

    // ✅ Optional: fetch job details when needed
    @ManyToOne(() => Job, { nullable: true, eager: true })
    @JoinColumn({ name: 'jobId' })
    job?: Job;

    @ManyToOne(() => Project, { nullable: true, eager: true })
    @JoinColumn({ name: 'projectId' })
    project?: Project;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'clientId' })
    client?: User;
}
