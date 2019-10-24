import HyperSoundBase from './hyper-base';
import Dac from '../services/audio/dac';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';

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
