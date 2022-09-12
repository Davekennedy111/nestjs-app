import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import databaseConfiguration from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfiguration)],
      useFactory: async (
        dbConfig: ConfigType<typeof databaseConfiguration>,
      ) => ({
        type: 'postgres',
        namingStrategy: new SnakeNamingStrategy(),
        autoLoadEntities: true,
        ...dbConfig,
      }),
      inject: [databaseConfiguration.KEY],
    }),
  ],
})
export class DatabaseModule {}
