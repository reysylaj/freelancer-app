import { Repository } from 'typeorm';
import { SavedJob } from './saved-job.entity';
import { SavedProject } from './saved-project.entity';
export declare class SavedService {
    private savedJobRepo;
    private savedProjectRepo;
    constructor(savedJobRepo: Repository<SavedJob>, savedProjectRepo: Repository<SavedProject>);
    saveJob(data: Partial<SavedJob>): Promise<SavedJob>;
    saveProject(data: Partial<SavedProject>): Promise<SavedProject>;
    getSavedJobsByTalent(talentId: number): Promise<SavedJob[]>;
    getSavedProjectsByClient(clientId: number): Promise<SavedProject[]>;
    removeSavedJob(id: number): Promise<import("typeorm").DeleteResult>;
    removeSavedProject(id: number): Promise<import("typeorm").DeleteResult>;
    findByClientId(clientId: number): Promise<SavedProject[]>;
}
