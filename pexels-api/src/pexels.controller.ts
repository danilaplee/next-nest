import { Controller, Get, Param } from '@nestjs/common';
import { PexelsService } from './pexels.service';

@Controller('pexels')
export class PexelsController {
  constructor(private readonly pexelsService: PexelsService) {}
  @Get()
  async findAll() {
    return this.pexelsService.curated();
  }

  @Get('/curated/:page')
  async getCuratedByPage(@Param() params: {page: number}) {
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
}
