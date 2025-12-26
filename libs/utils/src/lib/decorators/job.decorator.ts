import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

import { JobMetadata } from '../interfaces/job-metadata.interface';

export const JobMetadataKey = 'job_meta';

export const Job = (metadata: JobMetadata) =>
  applyDecorators(SetMetadata(JobMetadataKey, metadata), Injectable());
