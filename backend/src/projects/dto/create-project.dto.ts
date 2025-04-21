// src/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateProjectDto {
    @IsInt()
    talentId!: number;

    @IsString()
    @IsNotEmpty()
    user!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    role!: string;

    @IsArray()
    @IsNotEmpty()
    tools!: string[];

    @IsOptional()
    @IsArray()
    links?: string[];

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    media?: string;
}
