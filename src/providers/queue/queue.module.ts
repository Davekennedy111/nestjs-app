import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigType } from '@nestjs/config';
import queueConfigruation from './queue.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule.forFeature(queueConfigruation)],
      useFactory: async (
        queueConfig: ConfigType<typeof queueConfigruation>,
      ) => ({
        redis: queueConfig,
      }),
      inject: [queueConfigruation.KEY],
    }),
  ],
})
export class QueueModule {}
