import { Injectable } from '@nestjs/common';
import { createClient } from 'pexels';
@Injectable()
export class PexelsService {
  pexelsClient: ReturnType<typeof createClient>;
  constructor() {
    this.pexelsClient = createClient(process.env.PEXELS_API_KEY);
  }
  async curated(perPage: number = 100, page: number = 1) {
    return this.pexelsClient.photos.curated({ per_page: perPage, page });
  }
  async searchPhotos(query: string, perPage: number = 16, page: number = 1) {
    return this.pexelsClient.photos.search({ query, per_page: perPage, page });
  }
  async getPhoto(id: string) {
    return this.pexelsClient.photos.show({ id });
  }
}
