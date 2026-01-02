import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JobModule } from './jobs.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
