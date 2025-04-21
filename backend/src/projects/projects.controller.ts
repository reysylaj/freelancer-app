import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project.dto'
import { DeleteResult } from 'typeorm'; // ✅ Add this at the top

@Controller('projects')
export class ProjectsController {
    constructor(private readonly service: ProjectsService) { }

    @Post()
    create(@Body() project: CreateProjectDto): Promise<Project> {
        return this.service.create(project); // ✅ DTO is now validated
    }

    @Get()
    findAll(): Promise<Project[]> {
        return this.service.findAll();
    }

    @Get('talent/:talentId')
    findByTalentId(@Param('talentId') talentId: number): Promise<Project[]> {
        return this.service.findByTalentId(talentId);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.service.delete(id);
    }
}