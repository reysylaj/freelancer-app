import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { SavedService } from './saved.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user';


@Controller('saved')
export class SavedController {
    constructor(private readonly savedService: SavedService) { }

    // 🔹 Save a job (TALENT)
    @UseGuards(AuthGuard)
    @Post('job')
    async saveJob(@Req() req: RequestWithUser, @Body() body: { jobId: number }) {
        if (!req.user) throw new UnauthorizedException();
        return this.savedService.saveJob({
            talentId: req.user.id,
            jobId: body.jobId,
            savedAt: new Date(),
        });
    }

    // 🔹 Save a project (CLIENT)
    @UseGuards(AuthGuard)
    @Post('project')
    async saveProject(@Req() req: RequestWithUser, @Body() body: any) {
        if (!req.user) throw new UnauthorizedException();
        return this.savedService.saveProject({
            clientId: req.user.id,
            projectId: body.projectId,
            savedAt: new Date(),
        });
    }

    // 🔹 Get saved jobs for talent
    @UseGuards(AuthGuard)
    @Get('job')
    async getSavedJobs(@Req() req: RequestWithUser) {
        if (!req.user) throw new UnauthorizedException();
        return this.savedService.getSavedJobsByTalent(req.user.id);
    }

    // 🔹 Get saved projects for client
    @UseGuards(AuthGuard)
    @Get('project')
    async getSavedProjects(@Req() req: RequestWithUser) {
        if (!req.user) throw new UnauthorizedException();
        return this.savedService.getSavedProjectsByClient(req.user.id);
    }

    // 🔹 Remove saved job
    @UseGuards(AuthGuard)
    @Delete('job/:id')
    async deleteSavedJob(@Param('id') id: string) {
        return this.savedService.removeSavedJob(Number(id));
    }

    // 🔹 Remove saved project
    @UseGuards(AuthGuard)
    @Delete('project/:id')
    async deleteSavedProject(@Param('id') id: string) {
        return this.savedService.removeSavedProject(Number(id));
    }

    @UseGuards(AuthGuard)
    @Get('client')
    findByClient(@Req() req: RequestWithUser) {
        if (!req.user) throw new UnauthorizedException();
        return this.savedService.findByClientId(Number(req.user.id));
    }

}
