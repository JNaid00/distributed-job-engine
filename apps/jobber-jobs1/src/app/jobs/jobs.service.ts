import {
  AbstractJob,
  JOB_METADATA_KEY,
  JobMetadata,
} from '@distributed-job-engine/utils';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<AbstractJob>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<AbstractJob>(
      JOB_METADATA_KEY
    );
    console.log('🚀 ~ JobsService ~ onModuleInit ~ jobs:', this.jobs);
  }

  public getjobs(): AbstractJob[] {
    return this.jobs.map((job) => job.meta);
  }
}
