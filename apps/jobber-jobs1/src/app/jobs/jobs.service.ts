import { JOB_METADATA_KEY } from '@distributed-job-engine/utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(private readonly discoveryService: DiscoveryService) {}
  async onModuleInit() {
    const providers = await this.discoveryService.getProviders({
      metadataKey: JOB_METADATA_KEY,
    });
    console.log('🚀 ~ JobsService ~ onModuleInit ~ providers:', providers);
  }
}
