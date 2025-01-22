export const config = {
  redis: {
    host: (process.env.REDIS_HOST as string) || 'localhost',
    port: !isNaN(parseInt(process.env.REDIS_PORT, 10)) ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    username: process.env.REDIS_USER || undefined,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  isQueueConsumer: process.env.QUEUE_CONSUMER || undefined, 
  apiProducer: process.env.API_PRODUCER || undefined, 
  pexelsKey: process.env.PEXELS_API_KEY as string,
  maxRequestsPerSecond: !isNaN(parseInt(process.env.REQUESTS_PER_SECOND, 10)) ? parseInt(process.env.REQUESTS_PER_SECOND, 10) : 2
};
