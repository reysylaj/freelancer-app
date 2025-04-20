import { Repository } from 'typeorm';
import { Proposal } from './proposal.entity';
export declare class ProposalsService {
    private proposalRepo;
    constructor(proposalRepo: Repository<Proposal>);
    create(data: Partial<Proposal>): Promise<Proposal>;
    findAll(): Promise<Proposal[]>;
    findByClient(clientId: number): Promise<Proposal[]>;
    findByTalent(talentId: number): Promise<Proposal[]>;
    updateStatus(id: number, status: string): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
