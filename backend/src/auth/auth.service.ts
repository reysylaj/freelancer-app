import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(body: RegisterDto, response: any) {
        const existingUser = await this.usersService.findByEmail(body.email);

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = await this.usersService.registerUser({ ...body, password: hashedPassword });

        const jwt = await this.jwtService.signAsync({ id: newUser.id });
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return newUser;
    }

    async login(body: LoginDto, response: any) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) throw new UnauthorizedException('User not found');

        const valid = await bcrypt.compare(body.password, user.password);
        if (!valid) throw new UnauthorizedException('Incorrect password');

        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return user;
    }

    async logout(response: any) {
        response.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });

        return { message: 'Logout successful' };
    }

    async getUser(request: any) {
        const cookie = request.cookies['jwt'];
        if (!cookie) throw new UnauthorizedException('No JWT found');

        const data = await this.jwtService.verifyAsync(cookie);
        if (!data?.id) throw new UnauthorizedException('Invalid token');

        return this.usersService.findById(data.id);
    }
}
