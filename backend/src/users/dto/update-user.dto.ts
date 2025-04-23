import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsIn(['client', 'talent'])
    role?: 'client' | 'talent';

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    skills?: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsString()
    preferredLink?: string;

    @IsOptional()
    @IsNumber()
    jobsPosted?: number;
}
