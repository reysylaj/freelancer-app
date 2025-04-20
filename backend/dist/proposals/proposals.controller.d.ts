import { ProposalsService } from './proposals.service';
import { Proposal } from './proposal.entity';
export declare class ProposalsController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalsService);
    create(proposal: Partial<Proposal>): Promise<Proposal>;
    findAll(): Promise<Proposal[]>;
    findByClient(clientId: number): Promise<Proposal[]>;
    findByTalent(talentId: number): Promise<Proposal[]>;
    updateStatus(id: number, status: string): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
