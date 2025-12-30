import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { JobModel } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}
  @Query(() => [JobModel], { name: 'jobs' })
  getJobs() {
    return this.jobsService.getjobs();
  }

  @Mutation(() => JobModel)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return await this.jobsService.executeJob(executeJobInput.name);
  }
}
