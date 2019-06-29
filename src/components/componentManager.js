import dataStore from 'services/Store';
import defineUtilComponents from './util';
import PsDac from './ps-dac';
import PsEnvOsc from './ps-env-osc';
import PsGain from './ps-gain';
import PsOsc from './ps-osc';
import PsPatMidi from './ps-pat-midi';
import PsSeq from './ps-seq';

export const components = {
  PsDac,
  PsEnvOsc,
  PsGain,
  PsOsc,
  PsPatMidi,
  PsSeq,
};

export function defineComponents() {
  const componentList = Object.values(components);
  componentList.forEach(component => customElements.define(component.tag, component));
  defineUtilComponents();
  const allDefined = componentList.map(component => customElements.whenDefined(component.tag));
  Promise.all(allDefined)
    .then(() => dataStore.setValue({ componentsDefined: true }))
    .catch(error => console.log(error));
}
