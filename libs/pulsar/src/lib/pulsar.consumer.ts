import { OnModuleInit } from '@nestjs/common';
import * as Pulsar from 'pulsar-client';

import { PulsarClient } from './pulsar.client';

export abstract class PulsarConsumer implements OnModuleInit {
  private consumer!: Pulsar.Consumer;

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}
  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.onMessage.bind(this)
    );
  }

  protected async acknowledge(message: Pulsar.Message) {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: Pulsar.Message): Promise<void>;
}
