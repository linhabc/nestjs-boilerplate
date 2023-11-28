import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configs from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs demo')
    .setDescription('Nestjs demo API description')
    .setVersion('0.1')
    .build();

  // http://localhost:3000/api
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configs.PORT);
  console.log('listen on port ', configs.PORT);
}
bootstrap();
