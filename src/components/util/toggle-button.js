import metronomeManager from 'services/metronome/metronomeManager';

function buildButton(onClick) {
  const button = document.createElement('button');
  button.innerText = 'Toggle';
  button.addEventListener('click', onClick);
  return button;
}

export default class PsToggleButton extends HTMLElement {
  static get tag() {
    return 'ps-toggle-button';
  }

  constructor() {
    super();
    this.isOn = false;
  }

  connectedCallback() {
    const button = buildButton(this.toggle.bind(this));
    this.appendChild(button);
  }

  toggle() {
    this.isOn = !this.isOn;
    this.isOn ?
      metronomeManager.getMetronome().start() :
      metronomeManager.getMetronome().stop();
  }
}
