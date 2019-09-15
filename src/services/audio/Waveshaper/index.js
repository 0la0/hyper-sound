/**
 *  Waveshaper curves, see:
 *  https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
 *  http://music.columbia.edu/cmc/MusicAndComputers/chapter4/04_06.php
 *  http://msp.ucsd.edu/techniques/v0.11/book-html/node78.html
 */
import audioGraph from '../Graph';
import WetLevel from '../WetLevel';
import { getCarrierFunction, CARRIER_NAMES } from './carrierFunctions';

function createCurve(carrierFunction, sampleRate, multiplier) {
  const curve = new Float32Array(sampleRate);
  for (let i = 0; i < sampleRate; i++) {
    //adjust x such that the curve is centered in its domain
    const x = i * 2 / sampleRate - 1;
    //sigmoid with fast dropoff, range is (-1, 1)
    curve[i] = carrierFunction(x, multiplier, sampleRate);
  }
  return curve;
}

export default class Waveshaper {
  constructor (type = 'sig') {
    const audioContext = audioGraph.getAudioContext();
    const carrierFunction = getCarrierFunction(type);
    this.sampleRate = audioContext.sampleRate;
    this.input = audioContext.createGain();
    this.waveshaperNode = audioContext.createWaveShaper();
    this.wetLevel = new WetLevel(audioContext, this.input, this.waveshaperNode);
    this.input.connect(this.waveshaperNode);
    this.waveshaperNode.curve = createCurve(carrierFunction, this.sampleRate, 50);
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

  getWetParam() {
    return this.wetLevel;
  }

  setType(type) {
    if (!CARRIER_NAMES[type]) {
      console.warn(`Invalid waveshaper type: ${type}`);
      return;
    }
    const carrierFunction = getCarrierFunction(type);
    this.waveshaperNode.curve = createCurve(carrierFunction, this.sampleRate, 50);
  }
}
