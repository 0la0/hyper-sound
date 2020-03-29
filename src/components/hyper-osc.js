import HyperSoundBase from './hyper-base.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import ContinuousOscillator from '../services/audio/ContinuousOscillator.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';
import frequencySetting from '../services/Frequency.js';

export default class HyperSoundOsc extends HyperSoundBase {
  static get tag() {
    return 'h-osc';
  }

  static get observedAttributes() {
    return [ 'wav', 'frequency', 'modulator' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const waveform = this.getAttribute('wav');
    this.osc = new ContinuousOscillator(frequencySetting.getBaseFrequency(), waveform);
    this.audioModel = new UgenConnection('CONTINUOUS_OSC', this.osc, UgenConnectinType.EMPTY, UgenConnectinType.SIGNAL);
    this.paramMap = {
      frequency: new ContinuousParam({
        attrName: 'frequency',
        param: this.osc.getFrequencyParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: frequencySetting.getBaseFrequency(),
        element: this,
      }),
      wav: {
        setValue: val => this.osc.setWaveform(val),
        disconnect: () => {},
      },
      modulator: new ContinuousParam({
        attrName: 'modulator',
        param: this.osc.getFrequencyParam(),
        inputType: new InputType().signal(),
        defaultValue: frequencySetting.getBaseFrequency(),
        element: this,
      }),
    };
    this.start = () => this.osc.startAtTime();
    this.stop = () => this.osc.stop();
    document.addEventListener('METRONOME_START', this.start);
    document.addEventListener('METRONOME_STOP', this.stop);
    batchRender(() => {
      if (this.parentNode.audioModel) {
        this.audioModel.connectTo(this.parentNode.audioModel);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('METRONOME_START', this.start);
    document.removeEventListener('METRONOME_STOP', this.stop);
  }
}
