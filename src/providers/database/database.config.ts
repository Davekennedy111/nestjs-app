import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'db',
  port: Number.parseInt(process.env.DB_PORT) || 5432,
  name: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.DB_SYNC === 'true' || true,
}));
