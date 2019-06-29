import PsBase from './ps-base';
import { uuid } from 'services/Math';
import PatternBuilder from 'services/EventCycle/PatternFunctions/PatternBuilder.js';

export default class PsPatMidi extends PsBase {
  static get tag() {
    return 'ps-pat-midi';
  }

  constructor() {
    super();
    this.isMounted = false;
    console.log('ps-pat-midi')
  }

  connectedCallback() {
    this.isMounted = true;
    console.log('ps-pat-midi connected', this.getAttribute('pattern'))

    const patternString = this.getAttribute('pattern');
    const pattern = new PatternBuilder({ patternString, });


    this.componentId = uuid();
    const pattenModel = { pattern, id: this.componentId, };
    if (this.parentNode.patternModel) {
      this.onRemoveCallback = this.parentNode.patternModel.appendPattern(pattenModel);
    }
  }

  disconnectedCallback() {
    this.isMounted = false;
    console.log('ps-pat-midi disconnected', this, this.parentNode);
    if (this.onRemoveCallback) {
      this.onRemoveCallback();
    }
  }
}
