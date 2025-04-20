import { Job } from '../jobs/jobs.entity';
import { User } from '../users/user.entity';
export declare class Proposal {
    id: number;
    jobId: number;
    talentId: number;
    clientId: number;
    message: string;
    status: string;
    submittedAt: Date;
    job: Job;
    client: User;
    jobTitle: string;
    clientName: string;
}
