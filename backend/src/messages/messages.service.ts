import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepo: Repository<Message>,
    ) { }

    send(data: Partial<Message>) {
        const msg = this.messageRepo.create(data);
        return this.messageRepo.save(msg);
    }

    findConversation(clientId: number, talentId: number) {
        return this.messageRepo.find({
            where: [{ clientId, talentId }],
            order: { timestamp: 'ASC' },
        });
    }

    deleteMessage(id: number) {
        return this.messageRepo.delete(id);
    }
}
