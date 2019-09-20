import PsCrush from './ps-crush';
import PsDac from './ps-dac';
import PsEnvOsc from './ps-env-osc';
import PsFilter from './ps-filter';
import PsGain from './ps-gain';
import PsGate from './ps-gate';
import PsOsc from './ps-osc';
import PsPan from './ps-panner';
import PsReverb from './ps-reverb';
import PsSampler from './ps-sampler';
import PsTapeDelay from './ps-tape-delay';
import PsWaveshaper from './ps-waveshaper';

export const components = {
  PsCrush,
  PsDac,
  PsEnvOsc,
  PsFilter,
  PsGain,
  PsGate,
  PsOsc,
  PsPan,
  PsReverb,
  PsSampler,
  PsTapeDelay,
  PsWaveshaper
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
