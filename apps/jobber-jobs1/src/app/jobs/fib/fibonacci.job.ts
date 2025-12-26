import { Job, AbstractJob } from '@distributed-job-engine/utils';

@Job({
  name: 'FibonacciJob',
  description: 'Computes Fibonacci numbers',
})
export class FibonacciJob extends AbstractJob {
  compute(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return this.compute(n - 1) + this.compute(n - 2);
  }
}
