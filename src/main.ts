import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSwagger = new DocumentBuilder()
    .setTitle('Desafio API Natura')
    .setDescription(
      'A API busca informações de usuários e a sua lista de repositórios no GitHub',
    )
    .setVersion('1.0')
    .addTag('Desafio_API_Natura')
    .setContact('Paulo Jimenez', '', 'paulo.jimenez@avanade.com')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
