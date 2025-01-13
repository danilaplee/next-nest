import { Inject, Module } from '@nestjs/common';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PexelsController } from './pexels.controller';
import { PexelsService } from './pexels.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { PexelsQueueService } from './pexels.queue';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'API_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'pexels',
    }),
  ],
  controllers: [AppController],
  providers: [PexelsService, AppService],
})
export class MicroModule {}
