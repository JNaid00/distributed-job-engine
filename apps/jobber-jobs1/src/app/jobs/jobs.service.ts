import {
  AbstractJob,
  JOB_METADATA_KEY,
  JobMetadata,
} from '@distributed-job-engine/utils';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
    console.log('🚀 ~ JobsService ~ onModuleInit ~ jobs:', this.jobs);
  }

  public getjobs(): JobMetadata[] {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string): Promise<JobMetadata> {
    const jobEntry = this.jobs.find((job) => job.meta.name === name);
    if (!jobEntry) {
      throw new NotFoundException(`Job with name ${name} not found`);
    }

    await (jobEntry.discoveredClass.instance as AbstractJob).execute();

    return jobEntry.meta;
  }
}
