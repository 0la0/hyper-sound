import PsDac from './ps-dac';
import PsEnvOsc from './ps-env-osc';
import PsFilter from './ps-filter';
import PsGain from './ps-gain';
import PsOsc from './ps-osc';
import PsPan from './ps-panner';
import PsReverb from './ps-reverb';
import PsTapeDelay from './ps-tape-delay';

export const components = {
  PsDac,
  PsEnvOsc,
  PsFilter,
  PsGain,
  PsOsc,
  PsPan,
  PsReverb,
  PsTapeDelay,
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
