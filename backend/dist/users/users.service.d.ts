import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    registerUser(user: Partial<User>): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    updateUser(id: number, updateData: Partial<User>): Promise<User>;
}
