import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroModule } from './micro.module';
import { config } from './config';
async function bootstrap() {
  if (config.isQueueConsumer) {
    const appBackground = await NestFactory.createMicroservice(MicroModule, {
      transport: Transport.REDIS,
      options: config.redis,
    });
    await appBackground.listen();
  }
  if (config.apiProducer) {
    const app = await NestFactory.create(AppModule);
    const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        ...config.redis,
        wildcards: true,
      },
    });

    app.enableCors();
    await app.startAllMicroservices();
    await microserviceRedis.listen();
    await app.listen(process.env.PORT ?? 3000);
  }
}
bootstrap();
