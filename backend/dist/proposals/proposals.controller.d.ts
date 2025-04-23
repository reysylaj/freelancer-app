import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
export declare class ProposalsController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalsService);
    create(req: RequestWithUser, dto: CreateProposalDto): Promise<import("./proposal.entity").Proposal>;
    findAll(): Promise<import("./proposal.entity").Proposal[]>;
    findByClient(clientId: number): Promise<import("./proposal.entity").Proposal[]>;
    findByTalent(talentId: number): Promise<import("./proposal.entity").Proposal[]>;
    updateStatus(id: number, status: string): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
