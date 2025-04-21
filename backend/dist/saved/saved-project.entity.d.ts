import { Project } from '../projects/projects.entity';
export declare class SavedProject {
    id?: number;
    clientId?: number;
    projectId?: number;
    savedAt?: Date;
    project?: Project;
}
