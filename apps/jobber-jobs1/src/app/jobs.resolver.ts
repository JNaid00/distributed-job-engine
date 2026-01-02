import { GqlAuthGuard } from '@distributed-job-engine/nestjs';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { JobModel } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [JobModel], { name: 'jobs' })
  getJobs() {
    console.log('🚀 ~ JobsResolver ~ getJobs ~ called');
    return this.jobsService.getjobs();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => JobModel)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return await this.jobsService.executeJob(executeJobInput.name);
  }
}
