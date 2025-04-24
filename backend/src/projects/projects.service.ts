import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly repo: Repository<Project>,
    ) { }

    create(project: Partial<Project>) {
        const newProject = this.repo.create(project);
        return this.repo.save(newProject);
    }

    findAll() {
        return this.repo.find();
    }

    findByTalentId(talentId: number) {
        return this.repo.find({ where: { talentId } });
    }

    delete(id: number) {
        return this.repo.delete(id);
    }

    // ✅ ADD THIS METHOD
    async update(id: number, data: Partial<Project>, userId: number) {
        const project = await this.repo.findOneBy({ id });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        if (project.talentId !== userId) {
            throw new UnauthorizedException('Not your project');
        }

        Object.assign(project, data);
        return this.repo.save(project);
    }

    async findOneById(id: number): Promise<Project> {
        const project = await this.repo.findOneBy({ id });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }

}
