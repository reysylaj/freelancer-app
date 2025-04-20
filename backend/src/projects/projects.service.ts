// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
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
}
