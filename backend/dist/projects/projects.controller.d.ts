import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteResult } from 'typeorm';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(project: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findByTalentId(talentId: number): Promise<Project[]>;
    delete(id: number): Promise<DeleteResult>;
    updateProject(id: number, body: UpdateProjectDto, req: RequestWithUser): Promise<Project>;
    getProjectById(id: number): Promise<Project>;
}
