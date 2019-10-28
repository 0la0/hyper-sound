import HyperSoundBase from './hyper-base';
import playSample from '../services/audio/Sampler';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import AudioEventToModelAdapter from '../services/UgenConnection/AudioEventToModelAdapter';
import { batchRender, } from '../services/TaskScheduler';
import DiscreteParameter, { InputType, } from '../services/AudioParameter/DiscreteParam';
import TriggerParameter from '../services/AudioParameter/TriggerParameter';
import DiscreteModulationParam from '../services/AudioParameter/DiscreteModulationParam';
import { msToSec } from '../services/Math';

export default class HyperSoundSampler extends HyperSoundBase {
  static get tag() {
    return 'h-sampler';
  }

  static get observedAttributes() {
    return [ 'attack', 'sustain', 'release', 'name', 'trigger', 'modulator' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.eventModel = new AudioEventToModelAdapter(this.schedule.bind(this));
    this.audioModel = new UgenConnection('SAMPLER', this.eventModel, UgenConnectinType.MESSAGE, UgenConnectinType.SIGNAL);

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
      name: new DiscreteParameter({
        attrName: 'name',
        inputType: InputType.string,
        defaultValue: '',
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
      const sampleName = this.paramMap.name.getValueForTime(message.time.timeStamp);
      const modulationInputs = this.paramMap.modulator.modulationInputs;
      const asr = {
        attack: this.paramMap.attack.getValueForTime(message.time.timeStamp),
        sustain: this.paramMap.sustain.getValueForTime(message.time.timeStamp),
        release: this.paramMap.release.getValueForTime(message.time.timeStamp),
      };
      playSample(sampleName, message.time.timeStamp, 0, note, asr, outputs);
    });
  }
}