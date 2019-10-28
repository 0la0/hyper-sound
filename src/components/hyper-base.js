export default class HyperSoundBase extends HTMLElement {
  constructor() {
    super();
    this.isMounted = false;
  }

  connectedCallback() {
    this.isMounted = true;
  }

  disconnectedCallback() {
    this.isMounted = false;
    Object.keys(this.paramMap).forEach(key => this.paramMap[key].disconnect());
    this.audioModel && this.audioModel.disconnect();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    const param = this.paramMap[attrName];
    if (!param) {
      throw new Error(`Observed attribute not mapped ${attrName}`);
    }
    param.setValue(newVal);
  }
}
