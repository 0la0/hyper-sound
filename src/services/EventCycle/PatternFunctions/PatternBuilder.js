import parseCycle from 'services/EventCycle/Pattern/PatternStringParser';
import getRelativeCycle from 'services/EventCycle/Pattern/RelativeCycleBuilder';
import Pattern from 'services/EventCycle/Pattern/Pattern';
import { uuid } from 'services/Math';
import PatternTransformer from './PatternTransformer';

export default class PatternBuilder extends PatternTransformer{
  constructor({ patternString = '', baseAddress = '' }) {
    super();
    if (typeof patternString !== 'string') {
      throw new Error(`PatternString must be a string, received: ${patternString}`);
    }
    if (typeof baseAddress !== 'string') {
      throw new Error(`Pattern base address must be a string, received: ${baseAddress}`);
    }
    this.baseAddress = baseAddress;
    this.setValue(patternString);
    this.numTicks = 16;
    this.cnt = 0;
    this.id = uuid();
  }

  setValue(patternString) {
    this.patternString = patternString;
    this.pattern = parseCycle(patternString);
    this.relativeCycle = this.pattern.ok ? getRelativeCycle(this.pattern.content, 0, 1, this.baseAddress) : [];
  }

  tick() {
    const cnt = this.cnt++;
    const clonedCycle = this.relativeCycle.map(ele => ele.clone());
    const originalPattern = new Pattern(clonedCycle, this.baseAddress, this.numTicks, cnt);
    return this.transforms.reduce((pattern, patternTransform) => {
      if (!patternTransform.countPredicate(cnt)) {
        return pattern;
      }
      return patternTransform.transform(pattern);
    }, originalPattern);
  }

  isValid() {
    return this.pattern.ok;
  }

  clone() {
    return new PatternBuilder({
      patternString: this.patternString,
      baseAddress: this.baseAddress
    });
  }
}
