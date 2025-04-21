import { SavedService } from './saved.service';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
export declare class SavedController {
    private readonly savedService;
    constructor(savedService: SavedService);
    saveJob(req: RequestWithUser, body: {
        jobId: number;
    }): Promise<import("./saved-job.entity").SavedJob>;
    saveProject(req: RequestWithUser, body: any): Promise<import("./saved-project.entity").SavedProject>;
    getSavedJobs(req: RequestWithUser): Promise<import("./saved-job.entity").SavedJob[]>;
    getSavedProjects(req: RequestWithUser): Promise<import("./saved-project.entity").SavedProject[]>;
    deleteSavedJob(id: string): Promise<import("typeorm").DeleteResult>;
    deleteSavedProject(id: string): Promise<import("typeorm").DeleteResult>;
    findByClient(req: RequestWithUser): Promise<import("./saved-project.entity").SavedProject[]>;
}
