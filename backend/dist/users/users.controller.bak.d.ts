import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(user: Partial<User>): any;
    findAll(): any;
    findOne(id: string): any;
}
