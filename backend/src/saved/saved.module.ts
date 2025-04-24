// saved.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { SavedJob } from './saved-job.entity';
import { SavedProject } from './saved-project.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ import AuthModule
import { UsersModule } from '../users/users.module'; // ✅ ADD THIS

@Module({
    imports: [
        TypeOrmModule.forFeature([SavedJob, SavedProject]),
        AuthModule, // ✅ add this to get JwtService
        UsersModule
    ],
    providers: [SavedService],
    controllers: [SavedController],
})
export class SavedModule { }
