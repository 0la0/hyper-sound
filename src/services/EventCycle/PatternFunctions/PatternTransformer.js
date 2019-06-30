import arpeggiate from './ArpeggiatorHandler';
import degrade from './DegradeHandler';
import offset from './OffsetHandler';
import repeat from './RepeatHandler';
import reverse from './ReverseHandler';
import rotate from './RotateHandler';
import speed from './SpeedHandler';

export class PatternTransform {
  constructor(countPredicate, transform) {
    this.countPredicate = countPredicate;
    this.transform = transform;
  }

  getCountPredicate() {
    return this.countPredicate;
  }

  getTransform() {
    return this.transform;
  }
}

// TODO: remove class
export default class PatternTransformer {
  constructor() {
    this.transforms = [];
  }

  addTransform(transform) {
    this.transforms.push(transform);
  }

  removeTransform(transform) {
    this.transforms = this.transforms.filter(t => t !== transform);
  }

  // arp(arpStyle, step, distance, rate, repeat) {
  //   this.transforms.push(arpeggiate(arpStyle, step, distance, rate, repeat));
  //   this.transforms.push(transform);
  //   return transform;
  // }

  degrade(threshold) {
    const transform = degrade(threshold);
    this.transforms.push(transform);
    return transform;
  }

  // every(iteration, patternTransformer) {
  //   if (!Number.isInteger(iteration) || iteration < 2) {
  //     throw new TypeError(`Illegal Argument: integer greater than 1 required for every(${iteration}, patternTransform)`);
  //   }
  //   if (!(patternTransformer instanceof PatternTransformer)) {
  //     throw new TypeError(`Illegal Argument: PatternTransformer required for every(${iteration}, patternTransform)`);
  //   }
  //   const predicate = (cnt) => cnt % iteration === 0;
  //   patternTransformer.transforms.forEach(transform =>
  //     this.transforms.push(new PatternTransform(predicate, transform.transform)));
  //   return this;
  // }

  // offset(relativeOffset) {
  //   this.transforms.push(offset(relativeOffset));
  //   return this;
  // }

  offset(relativeOffset) {
    const transform = offset(relativeOffset);
    this.transforms.push(transform);
    return transform;
  }

  // repeat(numRepeats) {
  //   this.transforms.push(repeat(numRepeats));
  //   return this;
  // }

  repeat(numRepeats) {
    const transform = repeat(numRepeats);
    this.transforms.push(transform);
    return transform;
  }

  reverse() {
    const transform = reverse();
    this.transforms.push(transform);
    return transform;
  }

  rotate(rotation) {
    const transform = rotate(rotation);
    this.transforms.push(transform);
    return transform;
  }

  speed(relativeSpeed) {
    const transform = speed(relativeSpeed);
    this.transforms.push(transform);
    return transform;
  }
}
