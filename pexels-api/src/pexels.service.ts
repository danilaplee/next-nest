import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { createClient } from 'pexels';
import { config } from './config';
import * as naughty from 'naughty-words'
const allNaughtyWords = Object.values(naughty).flat() as string[]
console.info('allNaughtyWords', allNaughtyWords)
const maxRequestsPerSecond = config.maxRequestsPerSecond;
const replaceAllNaughty = (query:string) => {
  let cleanquery = allNaughtyWords.reduce((a,i)=>a.replaceAll(i, ''), query);
  return cleanquery
}
@Injectable()
export class PexelsService {
  pexelsClient: ReturnType<typeof createClient>;
  constructor(
    @InjectQueue('pexels') private pexelsQueue: Queue,
    @Inject('API_SERVICE') private client: ClientProxy,
  ) {
    this.pexelsClient = createClient(config.pexelsKey);
  }
  async curated(perPage: number = 100, page: number = 1) {
    return this.pexelsClient.photos.curated({ per_page: perPage, page });
  }
  async searchPhotos(query: string, perPage: number = 16, page: number = 1) {
    return this.pexelsClient.photos.search({ query:replaceAllNaughty(query), per_page: perPage, page });
  }
  async searchVideos(query: string, perPage: number = 16, page: number = 1) {
    return this.pexelsClient.videos.search({ query:replaceAllNaughty(query), per_page: perPage, page });
  }
  async getVideo(id: number) {
    return this.pexelsClient.videos.show({ id });
  }
  async getPhoto(id: number) {
    return this.pexelsClient.photos.show({ id });
  }
  @Cron('* * * * * *')
  async handleCron() {
    const jobs = await this.pexelsQueue.getJobs(
      undefined,
      0,
      maxRequestsPerSecond,
    );
    // this.logger.debug('Found jobs', jobs);
    await this.client.connect();
    await Promise.all(
      jobs.map(async (job) => {
        try {
          await this.pexelsQueue.updateJobProgress(job.id, 10);
          const response = await this[job.name](...Object.values(job.data));
          if (!response.id && !response.photos && !response.videos) throw 'invalid_response';
          console.info('res for job', JSON.stringify(response).length, job.id);
          await this.pexelsQueue.remove(job.id);
          this.client.emit('job_response', JSON.stringify({ response, job }));
        } catch (err) {
          console.error('job processing error', err);
          await this.pexelsQueue.remove(job.id);
          this.client.emit(
            'job_response',
            JSON.stringify({ response: { error: true }, job }),
          );
        }
      }),
    );
  }
}
