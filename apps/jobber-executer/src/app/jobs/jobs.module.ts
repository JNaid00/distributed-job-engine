import { PulsarModule } from '@distributed-job-engine/pulsar';
import { Module } from '@nestjs/common';

import { FibConsumer } from './fib/fib.consumer';

@Module({
  imports: [PulsarModule],
  providers: [FibConsumer],
})
export class JobsModule {}
