import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(body: RegisterDto, response: any): Promise<import("../users/user.entity").User>;
    login(body: LoginDto, response: any): Promise<import("../users/user.entity").User>;
    logout(response: any): Promise<{
        message: string;
    }>;
    getUser(request: any): Promise<import("../users/user.entity").User | null>;
}
