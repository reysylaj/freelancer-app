import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: RegisterDto, res: Response): Promise<import("../users/user.entity").User>;
    login(body: LoginDto, res: Response): Promise<import("../users/user.entity").User>;
    logout(res: Response): Promise<{
        message: string;
    }>;
    getMe(req: Request): Promise<import("../users/user.entity").User | null>;
}
