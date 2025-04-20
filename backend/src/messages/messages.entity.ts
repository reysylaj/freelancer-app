import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    clientId!: number;

    @Column()
    talentId!: number;

    @Column()
    sender!: 'client' | 'talent';

    @Column('text')
    text!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
 