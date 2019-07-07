import PsBase from './ps-base';
import PatternBuilder from 'services/EventCycle/PatternFunctions/PatternBuilder.js';
import { batchRender } from '../services/TaskScheduler';

export default class PsPatMidi extends PsBase {
  static get tag() {
    return 'ps-pat-midi';
  }

  static get observedAttributes() {
    return [ 'pattern' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.isMounted = true;
    this.paramMap = {
      pattern: new PatternBuilder({ patternString: this.getAttribute('pattern'), }),
    };

    batchRender(() => {
      if (this.parentNode.patternModel) {
        this.onRemoveCallback = this.parentNode.patternModel.appendPattern(this.paramMap.pattern);
      }
    });
  }

  disconnectedCallback() {
    this.isMounted = false;
    if (this.onRemoveCallback) {
      this.onRemoveCallback();
    }
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
