import { PulsarClient, PulsarConsumer } from '@distributed-job-engine/pulsar';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Message } from 'pulsar-client';

@Injectable()
export class FibConsumer extends PulsarConsumer implements OnModuleInit {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected onMessage(message: Message): Promise<void> {
    console.log('Hello');

    return;
  }
}
