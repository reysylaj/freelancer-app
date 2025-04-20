import { SavedService } from './saved.service';
import { Saved } from './saved.entity';
export declare class SavedController {
    private readonly savedService;
    constructor(savedService: SavedService);
    create(data: Partial<Saved>): Promise<Saved>;
    findAll(): Promise<Saved[]>;
    findByTalentId(talentId: string): Promise<Saved[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
