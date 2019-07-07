class Counter {
  constructor(length) {
    this.length = length;
    this.cnt = 0;
  }

  setLength(length) {
    this.length = length;
  }

  isReady() {
    return this.cnt === 0;
  }

  increment() {
    return this.cnt++;
  }

  isDone() {
    return this.cnt >= this.length;
  }

  reset() {
    this.cnt = 0;
  }
}

export default class CycleHandler {
  constructor(patternHandlers = []) {
    this.patternHandlers = patternHandlers;
    this.cycleIndex = 0;
    this.counter = new Counter(0);
  }

  appendPattern(pattern) {
    this.patternHandlers.push(pattern);
    return () => this.removePattern(pattern);
  }

  updatePattern() {}

  removePattern(pattern) {
    this.patternHandlers = this.patternHandlers.filter(p => p !== pattern);
  }

  handleTick(time, tickLength) {
    const activeCycle = this.patternHandlers[this.cycleIndex];
    if (!activeCycle) { return; }
    let audioEvents;
    if (this.counter.isReady()) {
      const pattern = activeCycle.tick();
      const numTicks = pattern.getNumTicks();
      const audioCycleDuration = tickLength * numTicks;
      this.counter.setLength(numTicks);
      audioEvents = pattern.getAudioEvents(time, audioCycleDuration);
    }

    this.counter.increment();
    if (this.counter.isDone()) {
      this.cycleIndex = (this.cycleIndex + 1) % this.patternHandlers.length;
      if (this.cycleIndex >= this.patternHandlers.length) {
        this.cycleIndex = 0;
      }
      this.counter.reset();
    }
    return audioEvents;
  }

  reset() {
    this.counter.reset();
  }
}
