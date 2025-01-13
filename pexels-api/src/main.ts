import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroModule } from './micro.module';

async function bootstrap() {
  const appBackground = await NestFactory.createMicroservice(MicroModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  const app = await NestFactory.create(AppModule);
  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      wildcards: true,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Pexels Api Example')
    .setDescription('Pexels Api')
    .setVersion('1.0')
    .addTag('pexels')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  await app.startAllMicroservices();
  await microserviceRedis.listen();
  await appBackground.listen();
  await Promise.all([app.listen(process.env.PORT ?? 3000)]);
}
bootstrap();
