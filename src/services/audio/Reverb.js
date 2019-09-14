import audioGraph from './Graph';
import buildConvolutionBuffer from './convolutionBuilder';
import WetLevel from './WetLevel';

export default class Reverb  {
  constructor (attack = 0.001, decay = 0.6) {
    const audioContext = audioGraph.getAudioContext();
    this.convolver = audioContext.createConvolver();
    this.input = audioContext.createGain();
    this.wetLevel = new WetLevel(audioContext, this.input, this.convolver);
    this.attack = attack;
    this.decay = decay;
    this.generateBuffer();
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

  setAttack(attack) {
    this.attack = attack;
    this.generateBuffer();
  }

  setDecay(decay) {
    this.decay = decay;
    this.generateBuffer();
  }

  getWetParam() {
    return this.wetLevel;
  }

  generateBuffer() {
    // TODO: MOVE TO WEB WORKER?
    setTimeout(() =>
      this.convolver.buffer = buildConvolutionBuffer(this.attack, this.decay)
    );
  }
}
