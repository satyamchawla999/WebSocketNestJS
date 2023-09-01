import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  // const config = new DocumentBuilder()
  //   .setTitle('Web Socket')
  //   .setDescription('socket.io implementation')
  //   .setVersion('1.0')
  //   .addTag('socket')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
