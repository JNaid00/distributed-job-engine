import {
  AbstractJob,
  JOB_METADATA_KEY,
  JobMetadata,
} from '@distributed-job-engine/utils';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

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

    if (!(jobEntry.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        `${jobEntry.discoveredClass.name} is not an instance of ${AbstractJob.name}`
      );
    }

    await jobEntry.discoveredClass.instance.execute({}, jobEntry.meta.name);

    return jobEntry.meta;
  }
}
