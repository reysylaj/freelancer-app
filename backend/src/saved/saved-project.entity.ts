// saved-project.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../projects/projects.entity';

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
}
