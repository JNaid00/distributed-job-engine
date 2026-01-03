import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Pulsar from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Pulsar.Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });
  private readonly producers: Pulsar.Producer[] = [];

  constructor(private readonly configService: ConfigService) {}

  async createProducer(topic: string) {
    const producer: Pulsar.Producer = await this.client.createProducer({
      topic: topic,
    });
    this.producers.push(producer);

    return producer;
  }

  async onModuleDestroy() {
    this.producers.forEach(prod => {
        prod.close();
    })
    await this.client.close();
  }
}
