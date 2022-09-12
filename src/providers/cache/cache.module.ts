import { CacheModule as NestJSCacheModule, Module } from '@nestjs/common';
import type { ClientOpts as RedisClientOptions } from 'redis';
import { ConfigModule, ConfigType } from '@nestjs/config';
import cacheConfiguration from './cache.config';
import * as store from 'cache-manager-redis-store';

@Module({
  imports: [
    NestJSCacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule.forFeature(cacheConfiguration)],
      useFactory: (cacheConfig: ConfigType<typeof cacheConfiguration>) => ({
        ttl: 600,
        store,
        ...cacheConfig,
      }),
      inject: [cacheConfiguration.KEY],
    }),
  ],
})
export class CacheModule {}
