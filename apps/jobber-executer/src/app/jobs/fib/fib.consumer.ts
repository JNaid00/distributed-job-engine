import { PulsarClient, PulsarConsumer } from '@distributed-job-engine/pulsar';
import { JobInfo } from '@distributed-job-engine/utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Message } from 'pulsar-client';

@Injectable()
export class FibConsumer extends PulsarConsumer implements OnModuleInit {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, JobInfo.Fibonacci.name);
  }

  protected onMessage(message: Message): Promise<void> {
    console.log(message);

    return;
  }
}
