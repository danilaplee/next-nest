import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PexelsController } from './pexels.controller';
@Module({
  imports: [],
  controllers: [AppController, PexelsController],
  providers: [AppService],
})
export class AppModule {}
