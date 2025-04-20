import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
export declare class ProjectsController {
    private readonly service;
    constructor(service: ProjectsService);
    create(project: Partial<Project>): Promise<Project>;
    findAll(): Promise<Project[]>;
    findByTalentId(talentId: number): Promise<Project[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
