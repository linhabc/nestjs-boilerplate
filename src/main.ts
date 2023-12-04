import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configs from './configs';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nestjs demo')
    .setDescription('Nestjs demo API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config); // /api
  SwaggerModule.setup('api', app, document);

  await app.listen(configs.PORT);
  console.log('listen on port ', configs.PORT);
}
bootstrap();
