import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  host: process.env.REDIS_HOST || 'redis',
  port: Number.parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  db: Number.parseInt(process.env.REDIS_QUEUE_DB) || 1,
}));
