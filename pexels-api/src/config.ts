export const config = {
  redis: {
    host: (process.env.REDIS_HOST as string) || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  pexelsKey: process.env.PEXELS_API_KEY as string,
};
