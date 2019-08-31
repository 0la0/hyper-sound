// import { AUDIO_TICK_MULTIPLIER } from '../midi/util';
const AUDIO_TICK_MULTIPLIER = 1000;

export default class TimeSchedule {
  constructor(timeStamp = 0) {
    this.timeStamp = timeStamp;
    // this.audio = audio || 0;
    // this.midi = midi || 0;
  }

  add(delta) {
    this.timeStamp = this.timeStamp + delta;
    // this.audio = this.audio + delta;
    // this.midi = this.midi + delta * AUDIO_TICK_MULTIPLIER;
    return this;
  }

  // addMidi(delta) {
  //   this.midi = this.midi + delta;
  //   return this;
  // }

  // addAudio(delta) {
  //   this.audio = this.audio + delta;
  //   return this;
  // }

  copy(timeSchedule) {
    if (!(timeSchedule instanceof TimeSchedule)) {
      throw new Error('TimeSchedule.copy can only copy TimeSchedule', timeSchedule);
    }
    this.timeStamp = timeSchedule.timeStamp;
    // this.audio = timeSchedule.audio;
    // this.midi = timeSchedule.midi;
  }

  clone() {
    return new TimeSchedule(this.timeStamp);
  }
}
