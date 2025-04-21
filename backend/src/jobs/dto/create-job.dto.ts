// src/jobs/dto/create-job.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @Type(() => Number)
    @IsNumber()
    budget!: number;

    @IsString()
    @IsNotEmpty()
    jobType!: string;

    @IsString()
    @IsNotEmpty()
    seniorityLevel!: string;

    @IsString()
    @IsNotEmpty()
    workMode!: string;

    @Type(() => Number)
    @IsNumber()
    clientId!: number;
}
