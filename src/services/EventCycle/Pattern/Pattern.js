import { buildAudioEventsFromPattern } from 'services/EventCycle/Pattern/AudioEventBuilder';

export default class Pattern {
  constructor(relativeCycle, baseAddress, numTicks, cnt) {
    this.relativeCycle = relativeCycle;
    this.baseAddress = baseAddress;
    this.numTicks = numTicks;
    this.cnt = cnt;
  }

  setRelativeCycle(relativeCycle) {
    this.relativeCycle = relativeCycle;
    return this;
  }

  getRelativeCycle() {
    return this.relativeCycle;
  }

  setBaseAddress(baseAddress) {
    this.baseAddress = baseAddress;
    return this;
  }

  getBaseAddress() {
    return this.baseAddress;
  }

  setNumTicks(numTicks) {
    this.numTicks = numTicks;
    return this;
  }

  getNumTicks() {
    return this.numTicks;
  }

  getCnt() {
    return this.cnt;
  }

  getAudioEvents(time, audioCycleDuration) {
    return buildAudioEventsFromPattern(this.relativeCycle, this.baseAddress, time, audioCycleDuration);
  }
}
