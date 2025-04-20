import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { Proposal } from './proposal.entity';

@Controller('proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) { }

    @Post()
    create(@Body() proposal: Partial<Proposal>) {
        return this.proposalsService.create(proposal);
    }

    @Get()
    findAll() {
        return this.proposalsService.findAll();
    }

    @Get('client/:clientId')
    findByClient(@Param('clientId') clientId: number) {
        return this.proposalsService.findByClient(clientId);
    }

    @Get('talent/:talentId')
    findByTalent(@Param('talentId') talentId: number) {
        return this.proposalsService.findByTalent(talentId);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: number, @Body('status') status: string) {
        return this.proposalsService.updateStatus(id, status);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.proposalsService.delete(id);
    }
}
