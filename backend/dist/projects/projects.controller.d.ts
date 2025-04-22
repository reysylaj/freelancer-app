import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteResult } from 'typeorm';
export declare class ProjectsController {
    private readonly projectService;
    constructor(projectService: ProjectsService);
    create(project: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findByTalentId(talentId: number): Promise<Project[]>;
    delete(id: number): Promise<DeleteResult>;
    getByTalent(id: number): Promise<Project[]>;
}
