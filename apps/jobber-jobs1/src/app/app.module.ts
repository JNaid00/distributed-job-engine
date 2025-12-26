import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FibModule } from './jobs/fib/fib.module';

@Module({
  imports: [ConfigModule, FibModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
