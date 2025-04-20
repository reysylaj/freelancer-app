import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SavedService } from './saved.service';
import { Saved } from './saved.entity';

@Controller('saved')
export class SavedController {
    constructor(private readonly savedService: SavedService) { }

    @Post()
    create(@Body() data: Partial<Saved>) {
        return this.savedService.create(data);
    }

    @Get()
    findAll(): Promise<Saved[]> {
        return this.savedService.findAll();
    }

    @Get('talent/:talentId')
    findByTalentId(@Param('talentId') talentId: string) {
        return this.savedService.findByTalentId(Number(talentId));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.savedService.remove(Number(id));
    }
}
