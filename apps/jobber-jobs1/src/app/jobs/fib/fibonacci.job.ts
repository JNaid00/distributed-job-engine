import { PulsarClient } from '@distributed-job-engine/pulsar';
import { Job, AbstractJob, JobInfo } from '@distributed-job-engine/utils';
import { Injectable } from '@nestjs/common';

import { FibData } from './fibonacci-data.interface';

@Job({
  name: JobInfo.Fibonacci.name,
  description: JobInfo.Fibonacci.description,
})
@Injectable()
export class FibonacciJob extends AbstractJob<FibData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
