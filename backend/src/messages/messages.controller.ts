//messages/messages.controller.ts
import { Controller, Get, Post, Param, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @UseGuards(AuthGuard)
    @Post()
    sendMessage(@Req() req: RequestWithUser, @Body() dto: CreateMessageDto) {
        return this.messagesService.send({
            ...dto,
            sender: dto.sender, // if needed
        });
    }

    @UseGuards(AuthGuard)
    @Get(':clientId/:talentId')
    getChat(@Param('clientId') clientId: number, @Param('talentId') talentId: number) {
        return this.messagesService.findConversation(clientId, talentId);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.messagesService.deleteMessage(id);
    }
}
