import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PexelsService } from './pexels.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from './config';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'API_SERVICE',
        transport: Transport.REDIS,
        options: config.redis,
      },
    ]),
    BullModule.forRoot({
      connection: config.redis,
    }),
    BullModule.registerQueue({
      name: 'pexels',
    }),
  ],
  controllers: [AppController],
  providers: [PexelsService, AppService],
})
export class MicroModule {}
