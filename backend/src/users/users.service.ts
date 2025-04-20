import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    create(user: Partial<User>) {
        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
    }

    findAll() {
        return this.userRepo.find();
    }

    findOne(id: number) {
        return this.userRepo.findOneBy({ id });
    }

    findByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }
}
 