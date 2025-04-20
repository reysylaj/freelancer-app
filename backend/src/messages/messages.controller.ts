import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    sendMessage(@Body() data: Partial<Message>) {
        return this.messagesService.send(data);
    }

    @Get(':clientId/:talentId')
    getChat(@Param('clientId') clientId: number, @Param('talentId') talentId: number) {
        return this.messagesService.findConversation(clientId, talentId);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.messagesService.deleteMessage(id);
    }
}
