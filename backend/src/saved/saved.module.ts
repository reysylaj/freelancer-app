import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saved } from './saved.entity';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Saved])],
    providers: [SavedService],
    controllers: [SavedController],
})
export class SavedModule { }
