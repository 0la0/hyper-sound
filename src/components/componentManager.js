import HyperCrush from './hyper-crush';
import HyperDac from './hyper-dac';
import HyperEnvOsc from './hyper-env-osc';
import HyperFilter from './hyper-filter';
import HyperGain from './hyper-gain';
import HyperGate from './hyper-gate';
import HyperOsc from './hyper-osc';
import HyperPan from './hyper-panner';
import HyperReverb from './hyper-reverb';
import HyperSampler from './hyper-sampler';
import HyperTapeDelay from './hyper-tape-delay';
import HyperWaveshaper from './hyper-waveshaper';

export const components = {
  HyperCrush,
  HyperDac,
  HyperEnvOsc,
  HyperFilter,
  HyperGain,
  HyperGate,
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
