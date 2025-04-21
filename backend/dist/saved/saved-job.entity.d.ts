import { Job } from '../jobs/jobs.entity';
export declare class SavedJob {
    id?: number;
    talentId?: number;
    jobId?: number;
    savedAt?: Date;
    job?: Job;
}
