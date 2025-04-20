import { MessagesService } from './messages.service';
import { Message } from './messages.entity';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    sendMessage(data: Partial<Message>): Promise<Message>;
    getChat(clientId: number, talentId: number): Promise<Message[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
