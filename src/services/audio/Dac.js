import audioGraph from 'services/audio/Graph';

export default class Dac {
  constructor() {
    this.gain = audioGraph.getAudioContext().createGain();
    this.gain.connect(audioGraph.getOutput());
  }

  disconnect() {
    this.gain.disconnect();
  }

  getInput() {
    return this.gain;
  }
}
