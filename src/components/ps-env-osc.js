import PsBase from './ps-base';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import AudioEventToModelAdapter from '../services/UgenConnection/AudioEventToModelAdapter';
import envelopedOscilator from '../services/audio/EnvelopedOscillator';
import envelopedNoise from '../services/audio/EnvelopedNoise';
import { msToSec } from '../services/Math';
import { batchRender, } from '../services/TaskScheduler';
import DiscreteParameter, { InputType, } from '../util/DiscreteParam';
import TriggerParameter from '../util/TriggerParameter';
import DiscreteModulationParam from '../util/DiscreteModulationParam';

export default class PsEnvOsc extends PsBase {
  static get tag() {
    return 'ps-env-osc';
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
        envelopedNoise(message.time.timeStamp, asr, 1, outputs);
      } else {
        envelopedOscilator(note, message.time.timeStamp, asr, waveform, 1, outputs, modulationInputs);
      }
    });
  }
}
