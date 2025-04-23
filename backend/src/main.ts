// main.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // ✅ Parse cookies from requests
    app.use(cookieParser());

    // ✅ Enable CORS with credentials (cookies)
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    // ✅ Use class-validator globally
    app.useGlobalPipes(new ValidationPipe({
        
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 👈 important for @Type to work!
        
    }));

    await app.listen(3000);

    
}

bootstrap();