import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal } from './proposal.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Proposal])],
    providers: [ProposalsService],
    controllers: [ProposalsController],
})
export class ProposalsModule { }
