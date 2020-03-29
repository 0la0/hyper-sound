import audioGraph from './Graph.js';

export default class TapeDelay  {
  constructor(delayTime = 0, feedback = 0.2, wet = 0.5) {
    const audioContext = audioGraph.getAudioContext();
    this.output = audioContext.createGain();
    this.delay = audioContext.createDelay();
    this.feedback = audioContext.createGain();
    this.wetLevel = audioContext.createGain();

    this.delay.delayTime.value = delayTime;
    this.feedback.gain.value = feedback;
    this.wetLevel.gain.value = wet;

    this.feedback.connect(this.delay);
    this.delay.connect(this.wetLevel);
    this.delay.connect(this.feedback);
    this.wetLevel.connect(this.output);
    this.feedback.connect(this.output);
  }

  connect(node) {
    this.output.connect(node);
  }

  disconnect(node) {
    this.output.disconnect(node);
  }

  getInput() {
    return this.delay;
  }

  getDelayParam() {
    return this.delay.delayTime;
  }

  getFeedbackParam() {
    return this.feedback.gain;
  }

  getWetParam() {
    return this.wetLevel.gain;
  }
}
