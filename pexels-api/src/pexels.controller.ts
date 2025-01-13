import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PexelsQueueService } from './pexels.queue';
import {
  Ctx,
  EventPattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('pexels')
@CacheTTL(60 * 60000)
export class PexelsController {
  private readonly logger = new Logger(PexelsController.name);
  constructor(private readonly pexelsService: PexelsQueueService) {}
  @Get()
  async findAll() {
    return this.pexelsService.curated();
  }

  @Get('/curated/:page')
  async getCuratedByPage(@Param() params: { page: number }) {
    return this.pexelsService.curated(undefined, params.page);
  }

  @Get(':id')
  async getPhoto(@Param() params: { id: number }) {
    return await this.pexelsService.getPhoto(params.id);
  }

  @Get('/search/:query')
  async searchPhotos(@Param() params: { query: string }) {
    const data = await this.pexelsService.searchPhotos(params.query);
    return data;
  }
  @EventPattern('job_response')
  getNotifications(@Payload() data: string, @Ctx() context: RedisContext) {
    // this.logger.log("job_response", data)
    try {
      const result = JSON.parse(data);
      this.pexelsService.requests[result.job.id](result.response);
    } catch (err) {
      this.logger.log('job_response', data);
    }
  }
}
