//proposals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './proposal.entity';

@Injectable()
export class ProposalsService {
    constructor(
        @InjectRepository(Proposal)
        private proposalRepo: Repository<Proposal>,
    ) { }

    create(data: Partial<Proposal>) {
        const proposal = this.proposalRepo.create(data);
        return this.proposalRepo.save(proposal);
    }

    findAll() {
        return this.proposalRepo.find();
    }

    findByClient(clientId: number) {
        return this.proposalRepo.find({ where: { clientId } });
    }

    findByTalent(talentId: number) {
        return this.proposalRepo.find({ where: { talentId } });
    }

    updateStatus(id: number, status: string) {
        return this.proposalRepo.update(id, { status });
    }

    delete(id: number) {
        return this.proposalRepo.delete(id);
    }
}
