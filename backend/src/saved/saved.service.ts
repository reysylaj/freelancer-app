// saved.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJob } from './saved-job.entity';
import { SavedProject } from './saved-project.entity';

@Injectable()
export class SavedService {
    constructor(
        @InjectRepository(SavedJob)
        private savedJobRepo: Repository<SavedJob>,

        @InjectRepository(SavedProject)
        private savedProjectRepo: Repository<SavedProject>,
    ) { }

    // 🔹 Save a job for a talent
    async saveJob(data: Partial<SavedJob>) {
        const newSaved = this.savedJobRepo.create(data); // ✅ use savedJobRepo
        return this.savedJobRepo.save(newSaved);
    }

    // 🔹 Save a project for a client
    async saveProject(data: Partial<SavedProject>) {
        const newSaved = this.savedProjectRepo.create(data);
        return this.savedProjectRepo.save(newSaved);
    }

    // 🔹 Get saved jobs for current talent
    async getSavedJobsByTalent(talentId: number) {
        if (!talentId || isNaN(talentId)) throw new UnauthorizedException();
        return this.savedJobRepo.find({
            where: { talentId },
            relations: ['job'], // include full job info
        });
    }

    // 🔹 Get saved projects for current client
    async getSavedProjectsByClient(clientId: number) {
        if (!clientId || isNaN(clientId)) {
            console.warn('❌ Invalid or missing clientId:', clientId);
            throw new UnauthorizedException();
        }

        try {

            const saved = await this.savedProjectRepo.find({
                where: { clientId },
                relations: ['project'], // ✅ Important for full project details
            });

            return saved;

        } catch (error) {
            console.error('❌ Error fetching saved projects:', error);
            throw error;
        }
    }



    // 🔹 Delete saved job
    async removeSavedJob(id: number) {
        return this.savedJobRepo.delete(id);
    }

    // 🔹 Delete saved project
    async removeSavedProject(id: number) {
        return this.savedProjectRepo.delete(id);
    }

    // 🔹 (Optional) for legacy code
    async findByClientId(clientId: number) {
        return this.getSavedProjectsByClient(clientId);
    }
}
