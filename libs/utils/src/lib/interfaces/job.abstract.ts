import { PulsarClient, serialize } from '@distributed-job-engine/pulsar';
import { OnModuleDestroy } from '@nestjs/common';
import * as Pulsar from 'pulsar-client';

export abstract class AbstractJob<T> implements OnModuleDestroy {
  private producer: Pulsar.Producer | undefined;

  protected constructor(private readonly pulsarClient: PulsarClient) {}

  async onModuleDestroy() {
    await this.producer?.close();
  }

  async execute(job: string, data: T) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    console.log(`Executed ${job} with data ${data}`);
    await this.producer.send({ data: serialize(data) });
  }
}
