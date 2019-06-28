import PsDac from './ugens/ps-dac';
import PsEnvOsc from './ugens/ps-env-osc';
import PsGain from './ugens/ps-gain';
import PsOsc from './ugens/ps-osc';

const components = {
  PsDac,
  PsEnvOsc,
  PsGain,
  PsOsc,
};

function defineComponents() {
  Object.values(components).forEach(component => customElements.define(component.tag, component));
}

export default {
  components,
  defineComponents,
};
