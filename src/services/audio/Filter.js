import audioGraph from './Graph.js';

export default class Filter {
  constructor({
    type = 'lowpass',
    frequency = 440,
    q = 1,
    gain = 1,
  }) {
    const audioContext = audioGraph.getAudioContext();
    this.output = audioContext.createGain();
    this.filter = audioContext.createBiquadFilter();
    this.filter.type = type;
    this.filter.frequency.value = frequency;
    this.filter.Q.value = q;
    this.filter.gain.value = gain;
    this.filter.connect(this.output);
  }

  connect(node) {
    this.output.connect(node);
  }

  disconnect(node) {
    this.output.disconnect(node);
  }

  getInput() {
    return this.filter;
  }

  setTypeParam(type) {
    return this.filter.type = type;
  }

  getFrequencyParam() {
    return this.filter.frequency;
  }

  getQParam() {
    return this.filter.Q;
  }

  getGainParam() {
    return this.filter.gain;
  }
}
