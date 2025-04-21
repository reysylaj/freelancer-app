import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService // ✅ ADD THIS
    ) { }

    @Post('register')
    register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(body, res);
    }


    @Post('login')
    login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(body, res);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }
    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req: Request) {
        const user = await this.usersService.findById((req as any).user.id); // quick fix if `user` is custom
        return user;
    }

}
