// src/jobs/jobs.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    create(@Body() job: CreateJobDto): Promise<Job> {
        return this.jobsService.create(job);
    }

    @Get()
    findAll(): Promise<Job[]> {
        return this.jobsService.findAll();
    }

    @Get('client/:clientId')
    findByClient(@Param('clientId') clientId: number): Promise<Job[]> {
        return this.jobsService.findByClient(clientId);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Job> {
        return this.jobsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobsService.remove(Number(id));
    }
}
