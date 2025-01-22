import { Module } from '@nestjs/common';
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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PexelsQueueService } from './pexels.queue';
import { config } from './config';

@Module({
  imports: [
    CacheModule.register({
      useFactory: async () => {
        const store = await redisStore({
          socket: config.redis,
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 60 * 60000, // 60 minutes (milliseconds)
        };
      },
    }),
    ClientsModule.register([
      {
        name: 'API_SERVICE',
        transport: Transport.REDIS,
        options: config.redis,
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
  controllers: [AppController, PexelsController],
  providers: [
    AppService,
    PexelsQueueService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
