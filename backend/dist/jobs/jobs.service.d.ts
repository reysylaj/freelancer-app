import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
export declare class JobsService {
    private jobRepo;
    constructor(jobRepo: Repository<Job>);
    create(job: Partial<Job>): Promise<Job>;
    findAll(): Promise<Job[]>;
    findByClient(clientId: number): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    delete(id: number): Promise<void>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
