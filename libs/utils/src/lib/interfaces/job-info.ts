import { JobMetadata } from './job-metadata.interface';

export const Fibonacci: JobMetadata = {
  name: 'Fibonacci',
  description: 'Computes Fibonacci numbers',
};

export const JobInfo = {
  Fibonacci,
} as const;
