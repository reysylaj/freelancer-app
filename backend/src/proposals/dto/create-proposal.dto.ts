//dto/create-proposal.dto.ts

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProposalDto {
    @IsNumber()
    jobId!: number;

    @IsNumber()
    talentId!: number;

    @IsNumber()
    clientId!: number;

    @IsString()
    @IsNotEmpty()
    jobTitle!: string;

    @IsString()
    @IsNotEmpty()
    clientName!: string;

    @IsString()
    talentName!: string;

    @IsString()
    talentProfilePic!: string;

    @IsString()
    @IsNotEmpty()
    message!: string;

    @IsString()
    @IsNotEmpty()
    coverLetter!: string;

    @IsString()
    status!: string;
}
