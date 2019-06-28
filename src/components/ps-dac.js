import PsBase from './ps-base';
import Dac from 'services/audio/dac';
import UgenConnectinType from 'services/UgenConnection/UgenConnectionType';
import UgenConnection from 'services/UgenConnection/UgenConnection';

export default class PsDac extends PsBase {
  static get tag() {
    return 'ps-dac';
  }

  connectedCallback() {
    this.audioModel = new UgenConnection('DAC', new Dac(), UgenConnectinType.SIGNAL, UgenConnectinType.EMPTY);
  }

  disconnectedCallback() {
    this.audioModel.disconnect();
  }
}
