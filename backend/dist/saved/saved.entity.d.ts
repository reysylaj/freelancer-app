import { Job } from '../jobs/jobs.entity';
import { Project } from '../projects/projects.entity';
import { User } from '../users/user.entity';
export declare class Saved {
    id?: number;
    jobId?: number;
    projectId?: number;
    talentId?: number;
    clientId?: number;
    savedAt?: Date;
    job?: Job;
    project?: Project;
    client?: User;
}
