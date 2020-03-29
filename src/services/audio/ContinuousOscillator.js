import audioGraph from './Graph.js';
import applyTypeToOscillator from './OscillatorUtil/index.js';
import frequencySetting from '../Frequency.js';

export default class ContinuousOsc {
  constructor(frequency, type) {
    this.frequency = frequency || frequencySetting.getBaseFrequency();
    this.gain = audioGraph.getAudioContext().createGain();
    this.gain.gain.setValueAtTime(0, 0);
    this.osc = audioGraph.getAudioContext().createOscillator();
    applyTypeToOscillator(this.osc, type);
    this.osc.frequency.value = frequency;
    this.osc.connect(this.gain);
    this.osc.start();
  }

  connect(node) {
    this.gain.connect(node);
  }

  disconnect(node) {
    this.osc.disconnect();
    this.gain.disconnect(node);
  }

  getFrequencyParam() {
    return this.osc.frequency;
  }

  startAtTime(time = 0) {
    this.gain.gain.setValueAtTime(1, time);
  }

  stop(time = 0) {
    this.gain.gain.setValueAtTime(0, time);
  }

  setWaveform(type) {
    applyTypeToOscillator(this.osc, type);
  }
}
