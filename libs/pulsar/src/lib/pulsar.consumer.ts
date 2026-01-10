import { Logger, OnModuleInit } from '@nestjs/common';
import { logger } from 'nx/src/utils/logger';
import * as Pulsar from 'pulsar-client';
import { Message } from 'pulsar-client';

import { PulsarClient } from './pulsar.client';
import { deserialize } from './serliaze';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  private consumer!: Pulsar.Consumer;
  protected readonly logger = new Logger(this.topic);

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {
    logger.debug('PulsarConsumer');
  }

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this)
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());
      logger.debug(`Received ${JSON.stringify(data)}`);
      await this.onMessage(data);
    } catch (e) {
      logger.error(e);
    } finally {
      await this.acknowledge(message);
    }
  }

  protected async acknowledge(message: Pulsar.Message) {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(data: T): Promise<void>;
}
