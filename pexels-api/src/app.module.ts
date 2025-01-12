import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PexelsController } from './pexels.controller';
import { PexelsService } from './pexels.service';
@Module({
  imports: [],
  controllers: [AppController, PexelsController],
  providers: [AppService, PexelsService],
})
export class AppModule {}
