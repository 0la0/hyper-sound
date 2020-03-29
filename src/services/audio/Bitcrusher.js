import audioGraph from './Graph.js';
import WetLevel from './WetLevel.js';
import { getWorklet } from './WorkletUtil.js';

class Bitcrusher  {
  constructor(bitrusher) {
    const audioContext = audioGraph.getAudioContext();
    this.bitcrusher = bitrusher;
    this.input = audioContext.createGain();
    this.wetLevel = new WetLevel(audioContext, this.input, this.bitcrusher);
    this.input.connect(this.bitcrusher);
  }

  connect(node) {
    this.wetLevel.connect(node);
  }

  disconnect(node) {
    this.wetLevel.disconnect(node);
  }

  getInput() {
    return this.input;
  }

  getBitDepthParam() {
    return this.bitcrusher.parameters.get('bitDepth');
  }

  getFrequencyReductionParam() {
    return this.bitcrusher.parameters.get('frequencyReduction');
  }

  getWetParam() {
    return this.wetLevel;
  }
}

export default function buildBitcrusher() {
  return getWorklet(audioGraph.getAudioContext(), 'Bitcrusher')
    .then(bitcrusherNode => new Bitcrusher(bitcrusherNode));
}
