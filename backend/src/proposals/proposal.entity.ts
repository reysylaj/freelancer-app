// proposals.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Job } from '../jobs/jobs.entity';
import { User } from '../users/user.entity';

@Entity('proposals')
export class Proposal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    jobId!: number;

    @Column()
    talentId!: number;

    @Column()
    clientId!: number;

    @Column({ nullable: false })
    message!: string;

    @Column()
    status!: string;

    @Column({ type: 'text' })
    coverLetter!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    submittedA!: Date;

    // Relationships
    @ManyToOne(() => Job)
    @JoinColumn({ name: 'jobId' })
    job!: Job;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'clientId' })
    client!: User;

    @Column()
    jobTitle!: string;

    @Column()
    clientName!: string;

    //message purpose
    @Column()
    talentName!: string;

    @Column()
    talentProfilePic!: string;
}
