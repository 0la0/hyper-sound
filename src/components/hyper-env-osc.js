import HyperSoundBase from './hyper-base.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import AudioEventToModelAdapter from '../services/UgenConnection/AudioEventToModelAdapter.js';
import envelopedOscilator from '../services/audio/EnvelopedOscillator.js';
import envelopedNoise from '../services/audio/EnvelopedNoise.js';
import { msToSec } from '../services/Math.js';
import { batchRender, } from '../services/TaskScheduler.js';
import DiscreteParameter, { InputType, } from '../services/AudioParameter/DiscreteParam.js';
import TriggerParameter from '../services/AudioParameter/TriggerParameter.js';
import DiscreteModulationParam from '../services/AudioParameter/DiscreteModulationParam.js';

export default class HyperSoundEnvOsc extends HyperSoundBase {
  static get tag() {
    return 'h-env-osc';
  }

  static get observedAttributes() {
    return [ 'attack', 'sustain', 'release', 'wav', 'trigger', 'modulator' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.eventModel = new AudioEventToModelAdapter(this.schedule.bind(this));
    this.audioModel = new UgenConnection('ENVELOPED_OSC', this.eventModel, UgenConnectinType.MESSAGE, UgenConnectinType.SIGNAL);

    this.paramMap = {
      attack: new DiscreteParameter({
        attrName: 'attack',
        inputType: InputType.number,
        defaultValue: 0,
        element: this,
        transform: msToSec,
        isAddressable: true
      }),
      sustain: new DiscreteParameter({
        attrName: 'sustain',
        inputType: InputType.number,
        defaultValue: 0,
        element: this,
        transform: msToSec,
        isAddressable: true
      }),
      release: new DiscreteParameter({
        attrName: 'release',
        inputType: InputType.number,
        defaultValue: 100,
        element: this,
        transform: msToSec,
        isAddressable: true
      }),
      wav: new DiscreteParameter({
        attrName: 'wav',
        inputType: InputType.string,
        defaultValue: 'sin',
        element: this,
        isAddressable: false,
      }),
      trigger: new TriggerParameter({
        attrName: 'trigger',
        element: this,
        eventHandler: this.schedule.bind(this),
      }),
      modulator: new DiscreteModulationParam({
        attrName: 'modulator',
        element: this,
      }),
    };
    this.patternEventInlet = message => this.schedule(message);
    batchRender(() => {
      if (this.parentNode.audioModel) {
        this.audioModel.connectTo(this.parentNode.audioModel);
      }
    });
  }

  schedule(message) {
    setTimeout(() => {
      const note = message.note !== undefined ? message.note : 60;
      const outputs = [...this.eventModel.getOutlets()];
      const waveform = this.paramMap.wav.getValueForTime(message.time);
      const modulationInputs = this.paramMap.modulator.modulationInputs;
      const asr = {
        attack: this.paramMap.attack.getValueForTime(message.time),
        sustain: this.paramMap.sustain.getValueForTime(message.time),
        release: this.paramMap.release.getValueForTime(message.time),
      };
      if (waveform === 'noise') {
        // params: startTime, asr, gain, outputs
        envelopedNoise(message.time, asr, 1, outputs);
      } else {
        envelopedOscilator(note, message.time, asr, waveform, 1, outputs, modulationInputs);
      }
    });
  }
}
