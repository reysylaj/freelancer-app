//messages/dto/create-message.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateMessageDto {
    @IsNumber()
    clientId!: number;

    @IsNumber()
    talentId!: number;

    @IsString()
    @IsIn(['client', 'talent'])
    sender!: 'client' | 'talent';

    @IsString()
    @IsNotEmpty()
    text!: string;
}
