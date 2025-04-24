//auth.guard.ts

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies['jwt'];

        if (!token) {
            throw new UnauthorizedException('JWT token missing');
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token);
            // 👇 Add decoded payload to the request
            (request as any).user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            };
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid JWT');
        }
    }
}
