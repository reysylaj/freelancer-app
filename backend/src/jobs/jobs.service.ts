import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobRepo: Repository<Job>,
    ) { }

    async create(job: Partial<Job>): Promise<Job> {
        const newJob = this.jobRepo.create(job);
        return this.jobRepo.save(newJob);
    }

    async findAll(): Promise<Job[]> {
        return this.jobRepo.find();
    }

    async findByClient(clientId: number): Promise<Job[]> {
        return this.jobRepo.find({ where: { clientId } });
    }

    async findOne(id: number): Promise<Job> {
        const job = await this.jobRepo.findOneBy({ id });
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }

    async delete(id: number): Promise<void> {
        const result = await this.jobRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
    }
}
