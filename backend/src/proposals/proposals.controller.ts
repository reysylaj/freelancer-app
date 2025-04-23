import { Controller, Get, Post, Param, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user';

@Controller('proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req: RequestWithUser, @Body() dto: CreateProposalDto) {
        return this.proposalsService.create({
            ...dto,
            talentId: req.user.id, // 🛡️ Ensure talentId comes from JWT
        });
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.proposalsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('client/:clientId')
    findByClient(@Param('clientId') clientId: number) {
        return this.proposalsService.findByClient(clientId);
    }

    @UseGuards(AuthGuard)
    @Get('talent/:talentId')
    findByTalent(@Param('talentId') talentId: number) {
        return this.proposalsService.findByTalent(talentId);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/status')
    updateStatus(@Param('id') id: number, @Body('status') status: string) {
        return this.proposalsService.updateStatus(id, status);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.proposalsService.delete(id);
    }
}
