import PsBase from './ps-base';
import degrade from 'services/EventCycle/PatternFunctions/DegradeHandler';
import offset from 'services/EventCycle/PatternFunctions/OffsetHandler';
import repeat from 'services/EventCycle/PatternFunctions/RepeatHandler';
import reverse from 'services/EventCycle/PatternFunctions/ReverseHandler';
import rotate from 'services/EventCycle/PatternFunctions/RotateHandler';
import speed from 'services/EventCycle/PatternFunctions/SpeedHandler';

const transformDelegate = { degrade, offset, repeat, reverse, rotate, speed, };

export default class PsPatternMod extends PsBase {
  static get tag() {
    return 'ps-pat-mod';
  }

  static get observedAttributes() {
    return [ 'degrade', 'offset', 'repeat', 'reverse', 'rotate', 'speed' ];
  }

  addTransform(key, value) {
    const transformer = transformDelegate[key](value);
    this.transforms[key] = transformer;
    this.patterns.forEach(pattern => pattern.pattern.addTransform(transformer));
  }

  removeTransform(key) {
    this.patterns.forEach(pattern => pattern.pattern.removeTransform(this.transforms[key]));
    delete this.transforms[key];
  }

  connectedCallback() {
    super.connectedCallback();
    this.patterns = [];

    this.transforms = PsPatternMod.observedAttributes
      .filter(attr => this.hasAttribute(attr))
      .reduce((acc, attr) => {
        const value = parseFloat(this.getAttribute(attr), 10);
        const transform = transformDelegate[attr](value);
        return Object.assign(acc, { [attr]: transform });
      }, {});

    this.patternModel = {
      appendPattern: (pattern) => {
        Object.values(this.transforms).forEach(transform => pattern.pattern.addTransform(transform));
        this.patterns.push(pattern);
        if (this.parentNode.patternModel) {
          return this.parentNode.patternModel.appendPattern(pattern);
        }
        return () => {};
      },
      updatePattern: () => {}
    };
  }

  disconnectedCallback() {} // TODO

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    if (!this.hasAttribute(attrName)) {
      this.removeTransform(attrName);
      return;
    }
    if (oldVal === null  && newVal !== null) {
      this.addTransform(attrName, parseFloat(newVal, 10));
      return;
    }
    if (oldVal !== newVal) {
      this.removeTransform(attrName);
      this.addTransform(attrName, parseFloat(newVal, 10));
    }
  }
}
