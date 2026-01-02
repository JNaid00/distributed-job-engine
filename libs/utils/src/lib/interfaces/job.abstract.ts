// eslint-disable-next-line @nx/enforce-module-boundaries
import { PulsarClient } from '@distributed-job-engine/pulsar';
import { OnModuleDestroy } from '@nestjs/common';
import * as Pulsar from 'pulsar-client';
export abstract class AbstractJob<T> implements OnModuleDestroy {
  private producer: Pulsar.Producer | undefined;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async onModuleDestroy() {
    await this.producer?.close();
  }

  async execute(data: T, job: string) {
    if (!this.producer) {
      console.log('Producer is iniliased');
      this.producer = await this.pulsarClient.createProducer(job);
    }
    // Send message
    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }
}
