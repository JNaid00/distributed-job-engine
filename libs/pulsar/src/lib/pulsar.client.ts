import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Pulsar from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Pulsar.Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });

  constructor(private readonly configService: ConfigService) {}

  async createProducer(topic: string) {
    return this.client.createProducer({
      topic: topic,
    });
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
