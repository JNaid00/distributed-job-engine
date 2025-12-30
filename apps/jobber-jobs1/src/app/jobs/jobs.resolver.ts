import { Query, Resolver } from '@nestjs/graphql';

import { JobsService } from './jobs.service';
import { JobModel } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}
  @Query(() => [JobModel], { name: 'jobs' })
  getJobs() {
    return this.jobsService.getjobs();
  }
}
