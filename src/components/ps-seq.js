import metronomeManager from 'services/metronome/metronomeManager';
import MetronomeScheduler from 'services/metronome/MetronomeScheduler';
import { audioEventBus } from 'services/EventBus';
import CycleHandler from 'services/EventCycle/CycleHandler';
import PsBase from './ps-base';

export default class PsSeq extends PsBase {
  static get tag() {
    return 'ps-seq';
  }

  connectedCallback() {
    super.connectedCallback();
    this.cycleHandler = new CycleHandler([]);
    this.patternModel = {
      appendPattern: pattern => this.cycleHandler.appendPattern(pattern),
      updatePattern: pattern => this.cycleHandler.updatePattern(pattern)
    };
    this.metronomeSchedulable = new MetronomeScheduler({
      processTick: this.handleTick.bind(this),
      stop: () => console.log('ps-seq todo: stop'),
    });
    metronomeManager.getScheduler().register(this.metronomeSchedulable);
  }

  handleTick(tickNumber, time) {
    const audioEvents = this.cycleHandler.handleTick(time, metronomeManager.getMetronome().getTickLength());
    if (!audioEvents) { return; }
    audioEvents.forEach(audioEvent => audioEventBus.publish(audioEvent));
  }
}
