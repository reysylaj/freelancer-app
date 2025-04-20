// src/projects/projects.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly service: ProjectsService) { }

    @Post()
    create(@Body() project: Partial<Project>) {
        return this.service.create(project);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('talent/:talentId')
    findByTalentId(@Param('talentId') talentId: number) {
        return this.service.findByTalentId(talentId);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
