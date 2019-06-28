import CycleHandler from 'services/EventCycle/CycleHandler';
import { evaluateUserInput } from 'services/EventCycle/Evaluator';
import { createAudioGraphDefinition } from 'services/EventCycle/AudioGraph/AudioGraphHandler';
import AudioGraphManager from 'services/EventCycle/AudioGraph/AudioGraphManager';

export default class CycleManager {
  constructor() {
    this.cycleHandlers = [];
    this.nextCycleHandlers = null;
    this.nextGraphDefinition = null;
    this.errorMessage = '';
    this.audioGraphManager = new AudioGraphManager();
    this.setCycleString('');
  }

  setCycleString(cycleString) {
    if (typeof cycleString !== 'string') {
      throw new Error('Input must be string');
    }
    if (!cycleString) {
      return;
    }
    let cycleResults;
    try {
      const { sequences, audioGraphInlets } = evaluateUserInput(cycleString);
      cycleResults = sequences;
      const allInlets = audioGraphInlets.map(inlet => inlet.getAudioGraph());
      this.nextGraphDefinition = createAudioGraphDefinition(allInlets);
    } catch(error) {
      console.log(error); // eslint-disable-line no-console
      this._isValid = false;
      this.errorMessage = error.message;
      return;
    }
    this._isValid = cycleResults.every(cycleResult => cycleResult.every(cycle => cycle.isValid()));
    if (this._isValid) {
      this.nextCycleHandlers = cycleResults.map(cycleResult => new CycleHandler(cycleResult));
      this.errorMessage = '';
    }
  }

  isValid() {
    return this._isValid;
  }

  getAudioEventsAndIncrement(time, tickLength, shouldRefresh) {
    if (this.nextCycleHandlers && shouldRefresh) {
      this.cycleHandlers = this.nextCycleHandlers;
      this.nextCycleHandlers = null;
      if (this.nextGraphDefinition) {
        this.audioGraphManager.buildAudioGraph(this.nextGraphDefinition, time);
        this.nextGraphDefinition = null;
      }
    }
    return this.cycleHandlers
      .map(cycleHandler => cycleHandler.handleTick(time, tickLength))
      .filter(schedulables => !!schedulables)
      .flat();
  }

  stop() {
    this.audioGraphManager.cancelAllFutureAudioEvents();
    this.cycleHandlers.forEach(cycleHandler => cycleHandler.reset());
  }
}
