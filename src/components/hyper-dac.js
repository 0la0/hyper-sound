import HyperSoundBase from './hyper-base.js';
import Dac from '../services/audio/dac.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';

export default class HyperSoundDac extends HyperSoundBase {
  static get tag() {
    return 'h-dac';
  }

  connectedCallback() {
    super.connectedCallback();
    this.audioModel = new UgenConnection('DAC', new Dac(), UgenConnectinType.SIGNAL, UgenConnectinType.EMPTY);
    this.paramMap = {};
  }
}
