// src/projects/dto/update-project.dto.ts
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsArray()
    tools?: string[];

    @IsOptional()
    @IsArray()
    links?: string[];

    @IsOptional()
    @IsString()
    media?: string;
}
