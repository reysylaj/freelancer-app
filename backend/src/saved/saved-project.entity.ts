// saved-project.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { User } from '../users/user.entity'; // ✅ Adjust path if needed

@Entity()
export class SavedProject {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    clientId?: number;

    @Column()
    projectId?: number;

    @Column({ type: 'datetime' })
    savedAt?: Date;

    @ManyToOne(() => Project, { eager: true }) // ✅ this ensures 'project' is loaded
    @JoinColumn({ name: 'projectId' })
    project?: Project;

    @ManyToOne(() => User, { eager: true }) // 👈 this loads client info
    @JoinColumn({ name: 'clientId' })
    client?: User;

}
