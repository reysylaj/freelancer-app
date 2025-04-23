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
    @IsNotEmpty()
    message!: string;

    @IsString()
    @IsNotEmpty()
    coverLetter!: string;

    @IsString()
    status!: string;
}
