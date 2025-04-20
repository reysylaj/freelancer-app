import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    create(@Body() job: Partial<Job>) {
        return this.jobsService.create(job);
    }

    @Get()
    findAll() {
        return this.jobsService.findAll();
    }

    @Get('client/:clientId')
    findByClient(@Param('clientId') clientId: number) {
        return this.jobsService.findByClient(clientId);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.jobsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.jobsService.delete(id);
    }
}
