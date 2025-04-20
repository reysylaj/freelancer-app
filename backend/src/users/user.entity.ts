import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: 'client' | 'talent';

    @Column({ nullable: true })
    category!: string;

    @Column({ nullable: true })
    bio!: string;

    @Column({ nullable: true })
    skills!: string;

    @Column({ nullable: true })
    profilePicture!: string;


}
