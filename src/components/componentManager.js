import PsDac from './ps-dac';
import PsEnvOsc from './ps-env-osc';
import PsFilter from './ps-filter';
import PsGain from './ps-gain';
import PsOsc from './ps-osc';
import PsPan from './ps-panner';

export const components = {
  PsDac,
  PsEnvOsc,
  PsFilter,
  PsGain,
  PsOsc,
  PsPan,
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
}
