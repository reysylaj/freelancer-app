"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(body, response) {
        const existingUser = await this.usersService.findByEmail(body.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = await this.usersService.registerUser(Object.assign(Object.assign({}, body), { password: hashedPassword }));
        const jwt = await this.jwtService.signAsync({ id: newUser.id });
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });
        return newUser;
    }
    async login(body, response) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const valid = await bcrypt.compare(body.password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('Incorrect password');
        const jwt = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });
        return user;
    }
    async logout(response) {
        response.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
        });
        return { message: 'Logout successful' };
    }
    async getUser(request) {
        const cookie = request.cookies['jwt'];
        if (!cookie)
            throw new common_1.UnauthorizedException('No JWT found');
        const data = await this.jwtService.verifyAsync(cookie);
        if (!(data === null || data === void 0 ? void 0 : data.id))
            throw new common_1.UnauthorizedException('Invalid token');
        return this.usersService.findById(data.id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map