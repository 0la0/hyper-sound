
export default class Scheduler {
  constructor() {
    this.schedulables = new Set();
    this.isRunning = false;
    this.resetCounterVariables();
  }

  resetCounterVariables() {
    this.tickCounter = 0;
    this.tickToRender = 0;
    this.lastTickRendered = 0;
    this.nextScheduledTime = Number.MAX_VALUE;
  }

  processTick(time) {
    this.nextScheduledTime = time.midi;
    this.schedulables.forEach(schedulable => schedulable.processTick(this.tickCounter, time));
    this.tickToRender = this.tickCounter++;
  }

  register(schedulable) {
    this.schedulables.add(schedulable);
  }

  deregister(schedulable) {
    this.schedulables.delete(schedulable);
  }

  start() {
    this.tickCounter = 0;
    this.isRunning = true;
    this.schedulables.forEach(schedulable => schedulable.start());
    this.renderLoop();
  }

  stop() {
    this.isRunning = false;
    this.resetCounterVariables();
  }

  renderLoop() {
    if (this.nextScheduledTime >= performance.now() && this.tickToRender !== this.lastTickRendered) {
      this.schedulables.forEach(schedulable => schedulable.render(this.tickCounter, this.lastTickRendered));
      this.lastTickRendered = this.tickToRender;
    }
    if (this.isRunning) {
      requestAnimationFrame(this.renderLoop.bind(this));
    }
    else {
      this.resetCounterVariables();
      this.schedulables.forEach(schedulable => schedulable.stop());
    }
  }
}
