import HyperSoundBase from './hyper-base';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import ContinuousOscillator from '../services/audio/ContinuousOscillator';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';
import frequencySetting from '../services/Frequency';

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
