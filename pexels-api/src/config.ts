export const config = {
  redis: {
    host: (process.env.REDIS_HOST as string) || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USER || undefined,
    password: process.env.REDIS_PASS || undefined,
  },
  pexelsKey: process.env.PEXELS_API_KEY as string,
};
