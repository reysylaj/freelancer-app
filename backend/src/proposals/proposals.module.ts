// proposals.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal } from './proposal.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ ADD THIS

@Module({
    imports: [
        TypeOrmModule.forFeature([Proposal]),
        AuthModule // ✅ THIS MAKES JwtService AVAILABLE
    ],
    providers: [ProposalsService],
    controllers: [ProposalsController],
})
export class ProposalsModule { }
