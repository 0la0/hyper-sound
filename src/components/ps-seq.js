import metronomeManager from 'services/metronome/metronomeManager';
import MetronomeScheduler from 'services/metronome/MetronomeScheduler';
import { audioEventBus } from 'services/EventBus';
import PsBase from './ps-base';

import CycleHandler from 'services/EventCycle/CycleHandler';

class PatternManager {
  constructor() {
    this.patterns = [];
    this.cycleHandler = new CycleHandler([]);
  }

  appendPattern(pattern) {
    this.patterns.push(pattern);
    const onRemoveCallback = () => {
      this.patterns = this.patterns.filter(p => pattern !== p);
      console.log('removed>', this.patterns)
      this.cycleHandler = new CycleHandler(this.patterns.map(p => p.pattern));
    };
    console.log('patterns added', this.patterns);
    this.cycleHandler = new CycleHandler(this.patterns.map(p => p.pattern));
    console.log('cycleHandler', this.cycleHandler)
    return onRemoveCallback;
  }

  updatePattern(pattern) {
    const targetPattern = this.patterns.find(p => p.id === pattern.id);
    if (!targetPattern) {
      throw new Error('Pattern not found', pattern);
    }
    // update pattern
  }

  getAudioEventsAndIncrement(time, tickLength) {
    return this.cycleHandler.handleTick(time, tickLength);
  }
}

export default class PsSeq extends PsBase {
  static get tag() {
    return 'ps-seq';
  }

  connectedCallback() {
    super.connectedCallback();
    this.patternModel = new PatternManager();
    this.metronomeSchedulable = new MetronomeScheduler({
      processTick: this.handleTick.bind(this),
      stop: () => console.log('ps-seq todo: stop'),
    });
    metronomeManager.getScheduler().register(this.metronomeSchedulable);
  }

  handleTick(tickNumber, time) {
    const audioEvents = this.patternModel.getAudioEventsAndIncrement(time, metronomeManager.getMetronome().getTickLength())
    if (!audioEvents) { return; }
    audioEvents.forEach(audioEvent => audioEventBus.publish(audioEvent));
  }
}
