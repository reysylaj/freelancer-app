import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { SavedService } from './saved.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
import { SaveItemDto } from './dto/save-item.dto';
import { UsersService } from '../users/users.service';

@Controller('saved')
export class SavedController {
    constructor(
        private readonly savedService: SavedService,
        private readonly userService: UsersService
    ) { }

    @UseGuards(AuthGuard)
    @Post('job')
    async saveJob(@Req() req: RequestWithUser, @Body() body: SaveItemDto) {
        return this.savedService.saveJob({
            talentId: req.user.id,
            jobId: body.jobId,
            savedAt: new Date(),
        });
    }

    @UseGuards(AuthGuard)
    @Post('project')
    async saveProject(@Req() req: RequestWithUser, @Body() body: SaveItemDto) {
        return this.savedService.saveProject({
            clientId: req.user.id,
            projectId: body.projectId,
            savedAt: new Date(),
        });
    }

    @UseGuards(AuthGuard)
    @Get('job')
    getSavedJobs(@Req() req: RequestWithUser) {
        return this.savedService.getSavedJobsByTalent(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('project')
    getSavedProjects(@Req() req: RequestWithUser) {
        return this.savedService.getSavedProjectsByClient(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Delete('job/:id')
    deleteSavedJob(@Param('id') id: string) {
        return this.savedService.removeSavedJob(Number(id));
    }

    @UseGuards(AuthGuard)
    @Delete('project/:id')
    deleteSavedProject(@Param('id') id: string) {
        return this.savedService.removeSavedProject(Number(id));
    }

    @UseGuards(AuthGuard)
    @Get('client')
    findByClient(@Req() req: RequestWithUser) {
        return this.savedService.findByClientId(req.user.id);
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findById(id);
    }
}
