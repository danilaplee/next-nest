import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
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
    return await this.pexelsService.curated();
  }

  @Get('/curated/:page')
  async getCuratedByPage(@Param() params: { page: number }) {
    return await this.pexelsService.curated(undefined, params.page);
  }

  @Get(':id')
  async getPhoto(@Param() params: { id: number }) {
    return await this.pexelsService.getPhoto(params.id);
  }

  @Get('/video/:id')
  async getVideo(@Param() params: { id: number }) {
    return await this.pexelsService.getVideo(params.id);
  }

  @Get('/search/:query')
  async searchPhotos(
    @Param() params: { query: string },
    @Query() query: { page: number },
  ) {
    const data = await this.pexelsService.searchPhotos(
      params.query,
      80,
      query.page,
    );
    return data;
  }

  @Get('/videos/search/:query')
  async searchVideos(
    @Param() params: { query: string },
    @Query() query: { page: number },
  ) {
    const data = await this.pexelsService.searchVideos(
      params.query,
      80,
      query.page,
    );
    return data;
  }

  @EventPattern('job_response')
  getNotifications(@Payload() data: string) {
    // this.logger.log("job_response", data)
    try {
      const result = JSON.parse(data);
      if (result.response.error) {
        this.pexelsService.requests[result.job.id].reject({ error: true });
        return;
      }
      // console.info('result.job.id', result.job.id)
      this.pexelsService.requests[result.job.id].resolve(result.response);
      return;
    } catch (err) {
      this.logger.error('job_response_error', err);
      // this.logger.log('job_response', data);
    }
  }
}
