import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    budget!: number;

    @Column()
    jobType!: string;

    @Column()
    seniorityLevel!: string;

    @Column()
    workMode!: string;

    @Column()
    clientId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
