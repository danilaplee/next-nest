import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bullmq';

@Injectable()
export class PexelsQueueService {
  private readonly logger = new Logger(PexelsQueueService.name);
  requests = {};
  constructor(
    @InjectQueue('pexels') private pexelsQueue: Queue,
    @Inject('API_SERVICE') private client: ClientProxy,
  ) {
    this.client.connect();
  }
  
  async curated(perPage: number = 100, page: number = 1) {
    const job = await this.pexelsQueue.add('curated', { perPage, page });
    return new Promise((resolve, reject) => {
      this.requests[job.id] = { resolve, reject };
    });
  }

  async searchPhotos(query: string, perPage: number = 16, page: number = 1) {
    const job = await this.pexelsQueue.add('searchPhotos', {
      query,
      per_page: perPage,
      page,
    });
    return new Promise((resolve, reject) => {
      this.requests[job.id] = { resolve, reject };
    });
  }

  async getPhoto(id: number) {
    const job = await this.pexelsQueue.add('getPhoto', { id });
    return new Promise((resolve, reject) => {
      this.requests[job.id] = { resolve, reject };
    });
  }
}
