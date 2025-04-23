import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthModule } from '../auth/auth.module'; // ✅ ADD THIS

@Module({
    imports: [TypeOrmModule.forFeature([Message]),
        AuthModule
    ],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule { }