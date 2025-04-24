//auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    surname!: string;

    @IsNotEmpty()
    @IsString()
    role!: 'client' | 'talent';

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    @IsString()
    category!: string;

    @IsString()
    jobRole!: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}
