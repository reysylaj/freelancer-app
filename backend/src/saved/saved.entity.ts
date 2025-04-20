import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Saved {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    talentId!: number;

    @Column()
    jobId!: number;

    @Column()
    jobTitle!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    savedAt!: Date;
}
