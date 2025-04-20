import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // ✅ Enable CORS so frontend (5173) can connect
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();
