import audioGraph from './Graph.js';

class AsrEnvelope {
  constructor(attack, sustain, release) {
    this.attack = attack === undefined ? 0 : attack;
    this.sustain = sustain === undefined ? 0 : sustain;
    this.release = release === undefined ? 0 : release;
  }

  build(onTime, gain) {
    const gainValue = gain === undefined ? 1 : gain;
    const envelope = audioGraph.getAudioContext().createGain();
    envelope.gain.setValueAtTime(0, onTime);
    envelope.gain.linearRampToValueAtTime(gainValue, onTime + this.attack);
    envelope.gain.linearRampToValueAtTime(gainValue, onTime + this.attack + this.sustain);
    envelope.gain.linearRampToValueAtTime(0, onTime + this.attack + this.sustain + this.release);
    return envelope;
  }
}

class ArEnvelope {
  constructor(attack, release) {
    this.attack = attack === undefined ? 0 : attack;
    this.release = release === undefined ? 0 : release;
  }

  build(outputNode, onTime, offTime) {
    const envelope = audioGraph.getAudioContext().createGain();
    envelope.connect(outputNode);
    envelope.gain.setValueAtTime(0, onTime);
    envelope.gain.linearRampToValueAtTime(1, onTime + this.attack);
    envelope.gain.linearRampToValueAtTime(1, offTime);
    envelope.gain.linearRampToValueAtTime(0, offTime + this.release);
    return envelope;
  }
}

export {AsrEnvelope, ArEnvelope};
