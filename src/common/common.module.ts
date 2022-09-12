import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import commonConfiguration from './common.config';
import { CacheModule } from '../providers/cache/cache.module';
import { QueueModule } from '../providers/queue/queue.module';
import { DatabaseModule } from '../providers/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { Agent } from 'https';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfiguration],
      expandVariables: true,
    }),
    CacheModule,
    QueueModule,
    DatabaseModule,
    HttpModule.register({
      httpsAgent: new Agent({ rejectUnauthorized: false }),
    }),
  ],
  exports: [CacheModule, QueueModule, DatabaseModule],
})
export class CommonModule {}
