import { Repository } from 'typeorm';
import { Message } from './messages.entity';
export declare class MessagesService {
    private messageRepo;
    constructor(messageRepo: Repository<Message>);
    send(data: Partial<Message>): Promise<Message>;
    findConversation(clientId: number, talentId: number): Promise<Message[]>;
    deleteMessage(id: number): Promise<import("typeorm").DeleteResult>;
}
