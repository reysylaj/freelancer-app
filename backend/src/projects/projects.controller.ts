import {
    Controller, Get, Post, Body, Param,
    Delete, Patch, Req, UseGuards
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Body() project: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(project);
    }

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Get('talent/:talentId')
    findByTalentId(@Param('talentId') talentId: number): Promise<Project[]> {
        return this.projectsService.findByTalentId(talentId);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.projectsService.delete(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateProject(
        @Param('id') id: number,
        @Body() body: UpdateProjectDto,
        @Req() req: RequestWithUser,
    ) {
        return this.projectsService.update(id, body, req.user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard) // optional – only if this should be protected
    getProjectById(@Param('id') id: number): Promise<Project> {
        return this.projectsService.findOneById(id);
    }
}
