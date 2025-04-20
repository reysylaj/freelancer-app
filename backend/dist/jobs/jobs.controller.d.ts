import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(job: Partial<Job>): Promise<Job>;
    findAll(): Promise<Job[]>;
    findByClient(clientId: number): Promise<Job[]>;
    findOne(id: number): Promise<Job | null>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
