import HyperCrush from './hyper-crush.js';
import HyperDac from './hyper-dac.js';
import HyperEnvOsc from './hyper-env-osc.js';
import HyperFilter from './hyper-filter.js';
import HyperGain from './hyper-gain.js';
import HyperGate from './hyper-gate.js';
import HyperInlet from './hyper-inlet.js';
import HyperOsc from './hyper-osc.js';
import HyperPan from './hyper-panner.js';
import HyperReverb from './hyper-reverb.js';
import HyperSampler from './hyper-sampler.js';
import HyperTapeDelay from './hyper-tape-delay.js';
import HyperWaveshaper from './hyper-waveshaper.js';

export const components = {
  HyperCrush,
  HyperDac,
  HyperEnvOsc,
  HyperFilter,
  HyperGain,
  HyperGate,
  HyperInlet,
  HyperOsc,
  HyperPan,
  HyperReverb,
  HyperSampler,
  HyperTapeDelay,
  HyperWaveshaper
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
