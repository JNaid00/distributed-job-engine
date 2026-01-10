import { deserialize, serialize } from '@distributed-job-engine/pulsar';
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

import { FibData } from './jobs/fib/fibonacci-data.interface';

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

  async executeJob(name: string, data: object): Promise<JobMetadata> {
    const jobEntry = this.jobs.find((job) => job.meta.name === name);
    if (!jobEntry) {
      throw new NotFoundException(`Job with name ${name} not found`);
    }

    if (!(jobEntry.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        `${jobEntry.discoveredClass.name} is not an instance of ${AbstractJob.name}`
      );
    }
    console.log(
      '🚀 ~ JobsService ~ executeJob ~ jobEntry.meta.name:',
      jobEntry.meta.name
    );
    console.log(`Object data: ${JSON.stringify(data)}`);

    const s = serialize({ data: data });

    const d = deserialize<FibData>(s);
    console.log(`Hello from the other side: ${JSON.stringify(d)}`);

    await jobEntry.discoveredClass.instance.execute(jobEntry.meta.name, data);

    return jobEntry.meta;
  }
}
