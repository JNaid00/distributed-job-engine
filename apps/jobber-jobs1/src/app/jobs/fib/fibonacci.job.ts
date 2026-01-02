// eslint-disable-next-line @nx/enforce-module-boundaries
import { PulsarClient } from '@distributed-job-engine/pulsar';
import { Job, AbstractJob } from '@distributed-job-engine/utils';
import { Injectable } from '@nestjs/common';

import { FibData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Computes Fibonacci numbers',
})
@Injectable()
export class FibonacciJob extends AbstractJob<FibData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
  compute(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return this.compute(n - 1) + this.compute(n - 2);
  }
}
