import { JOB_METADATA_KEY } from '@distributed-job-engine/utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

@Injectable()
export class JobsService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();

    const jobProviders = providers.filter((wrapper) => {
      if (!wrapper.metatype) return false;

      return this.reflector.get(JOB_METADATA_KEY, wrapper.metatype);
    });

    console.log(
      jobProviders.map((p) => ({
        name: p.name,
        meta: this.reflector.get(JOB_METADATA_KEY, p.metatype),
      }))
    );
  }
}
