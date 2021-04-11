import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    stopAtFirstError: true,
  });

  app.useGlobalPipes(validationPipe);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Marketing site - Serban Munteanu - REST COMPONENT')
    .setDescription('API Documentation Rest')
    .setVersion('1.0')
    .addTag('Bomba')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, swaggerDocument);
  await app.listen(3000);
}
bootstrap();
