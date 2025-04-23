import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { AuthModule } from '../auth/auth.module'; // ✅ ADD THIS

@Module({
    imports: [TypeOrmModule.forFeature([Project]),
        AuthModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule { }
