import { Repository } from 'typeorm';
import { Saved } from './saved.entity';
export declare class SavedService {
    private savedRepo;
    constructor(savedRepo: Repository<Saved>);
    create(data: Partial<Saved>): Promise<Saved>;
    findAll(): Promise<Saved[]>;
    findByTalentId(talentId: number): Promise<Saved[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
