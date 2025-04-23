import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { RequestWithUser } from '../auth/interfaces/request-with-user';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    sendMessage(req: RequestWithUser, dto: CreateMessageDto): Promise<import("./messages.entity").Message>;
    getChat(clientId: number, talentId: number): Promise<import("./messages.entity").Message[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
