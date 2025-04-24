import { Repository } from 'typeorm';
import { Project } from './projects.entity';
export declare class ProjectsService {
    private readonly repo;
    constructor(repo: Repository<Project>);
    create(project: Partial<Project>): Promise<Project>;
    findAll(): Promise<Project[]>;
    findByTalentId(talentId: number): Promise<Project[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, data: Partial<Project>, userId: number): Promise<Project>;
    findOneById(id: number): Promise<Project>;
}
