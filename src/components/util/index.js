import ToggleButton from './toggle-button';

export const components = {
  ToggleButton,
};

export default function defineComponents() {
  Object.values(components).forEach(component => customElements.define(component.tag, component));
}
