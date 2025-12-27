import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JobModule } from './jobs/jobs.module';

@Module({
  imports: [ConfigModule, JobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
