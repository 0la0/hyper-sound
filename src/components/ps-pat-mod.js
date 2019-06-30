import PsBase from './ps-base';
import { batchRender } from '../services/TaskScheduler';

export default class PsPatternMod extends PsBase {
  static get tag() {
    return 'ps-pat-mod';
  }

  connectedCallback() {
    super.connectedCallback();
    this.patterns = [];
    this.patternModel = {
      appendPattern: (pattern) => {
        // TODO: transformations
        if (this.parentNode.patternModel) {
          return this.parentNode.patternModel.appendPattern(pattern);
        }
        return () => {};
      },
      updatePattern: (pattern) => {
        const targetPattern = this.patterns.find(p => p.id === pattern.id);
        if (!targetPattern) {
          throw new Error('Pattern not found', pattern);
        }
        // update pattern
      }
    };
  }

  disconnectedCallback() {
    
  }
}
