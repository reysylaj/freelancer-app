import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobRepo: Repository<Job>,
    ) { }

    create(job: Partial<Job>) {
        const newJob = this.jobRepo.create(job);
        return this.jobRepo.save(newJob);
    }

    findAll() {
        return this.jobRepo.find();
    }

    findByClient(clientId: number) {
        return this.jobRepo.find({ where: { clientId } });
    }

    findOne(id: number) {
        return this.jobRepo.findOneBy({ id });
    }

    delete(id: number) {
        return this.jobRepo.delete(id);
    }
}
