export default class WetLevel {
  constructor(audioContext, inputNode, wetNode) {
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();
    inputNode.connect(this.dryGain);
    inputNode.connect(wetNode);
    wetNode.connect(this.wetGain);
  }

  connect(node) {
    this.dryGain.connect(node);
    this.wetGain.connect(node);
  }

  disconnect(node) {
    this.dryGain.disconnect(node);
    this.wetGain.disconnect(node);
  }

  setValueAtTime(wetLevel, time) {
    this.wetGain.gain.setValueAtTime(wetLevel, time);
    this.dryGain.gain.setValueAtTime(1 - wetLevel, time);
  }

  linearRampToValueAtTime(wetLevel, time) {
    this.wetGain.gain.linearRampToValueAtTime(wetLevel, time);
    this.dryGain.gain.linearRampToValueAtTime(1 - wetLevel, time);
  }

  exponentialRampToValueAtTime(wetLevel, time) {
    this.wetGain.gain.exponentialRampToValueAtTime(wetLevel, time);
    this.dryGain.gain.exponentialRampToValueAtTime(1 - wetLevel, time);
  }
}
