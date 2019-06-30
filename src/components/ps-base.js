export default class PsBase extends HTMLElement {
  constructor() {
    super();
    this.isMounted = false;
  }

  connectedCallback() {
    this.isMounted = true;
  }
}
