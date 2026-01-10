import { PulsarClient, PulsarConsumer } from '@distributed-job-engine/pulsar';
import { JobInfo } from '@distributed-job-engine/utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { iterate } from 'fibonacci';

import { FibData } from './fib-data.interface';

@Injectable()
export class FibConsumer
  extends PulsarConsumer<FibData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, JobInfo.Fibonacci.name);
  }

  protected onMessage(data: FibData): Promise<void> {
    try {
      console.log(`Received onMessage ${JSON.stringify(data)}`);
      const result = iterate(data.iterations);
      this.logger.log(`Finished ${result}`);
    } catch (error) {
      this.logger.error(error);
    }
    return;
  }
}
