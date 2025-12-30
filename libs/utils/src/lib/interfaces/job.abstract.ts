export abstract class AbstractJob {
  execute() {
    console.log('Executing job:', this.constructor.name);
  }
}
