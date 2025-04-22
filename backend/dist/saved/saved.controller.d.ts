import { SavedService } from './saved.service';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
import { UsersService } from '../users/users.service';
export declare class SavedController {
    private readonly savedService;
    private readonly userService;
    constructor(savedService: SavedService, userService: UsersService);
    saveJob(req: RequestWithUser, body: {
        jobId: number;
    }): Promise<import("./saved-job.entity").SavedJob>;
    saveProject(req: RequestWithUser, body: any): Promise<import("./saved-project.entity").SavedProject>;
    getSavedJobs(req: RequestWithUser): Promise<import("./saved-job.entity").SavedJob[]>;
    getSavedProjects(req: RequestWithUser): Promise<import("./saved-project.entity").SavedProject[]>;
    deleteSavedJob(id: string): Promise<import("typeorm").DeleteResult>;
    deleteSavedProject(id: string): Promise<import("typeorm").DeleteResult>;
    findByClient(req: RequestWithUser): Promise<import("./saved-project.entity").SavedProject[]>;
    getUser(id: number): Promise<import("../users/user.entity").User | null>;
}
