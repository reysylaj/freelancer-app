import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project.dto'
import { DeleteResult } from 'typeorm'; // ✅ Add this at the top

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService, // ✅ Inject here
    ) { }

    @Post()
    create(@Body() project: CreateProjectDto): Promise<Project> {
        return this.projectService.create(project); // ✅ DTO is now validated
    }

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Get('talent/:talentId')
    findByTalentId(@Param('talentId') talentId: number): Promise<Project[]> {
        return this.projectService.findByTalentId(talentId);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.projectService.delete(id);
    }
    @Get('talent/:id')
    getByTalent(@Param('id') id: number) {
        return this.projectService.findByTalentId(+id);
    }
}