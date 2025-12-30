import { SetMetadata } from '@nestjs/common';

import { JobMetadata } from '../interfaces/job-metadata.interface';

export const JOB_METADATA_KEY = Symbol('JOB_METADATA_KEY');

export const Job = (metadata: JobMetadata) =>
  SetMetadata(JOB_METADATA_KEY, metadata);
