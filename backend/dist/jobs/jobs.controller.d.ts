import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { CreateJobDto } from './dto/create-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(job: CreateJobDto): Promise<Job>;
    findAll(): Promise<Job[]>;
    findByClient(clientId: number): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
