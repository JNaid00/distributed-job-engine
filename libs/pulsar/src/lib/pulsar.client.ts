import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Pulsar from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Pulsar.Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });
  private readonly producers: Pulsar.Producer[] = [];
  private readonly consumers: Pulsar.Consumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async createProducer(topic: string) {
    const producer: Pulsar.Producer = await this.client.createProducer({
      topic: topic,
    });
    this.producers.push(producer);

    return producer;
  }

  async createConsumer(
    topic: string,
    listener: (message: Pulsar.Message) => void
  ) {
    const consumer = await this.client.subscribe({
      topic: topic,
      subscription: 'jobber',
      listener: listener,
    });

    this.consumers.push(consumer);

    return consumer;
  }

  async onModuleDestroy() {
    await Promise.all(this.producers.map((prod) => prod.close()));
    await this.client.close();
  }
}
