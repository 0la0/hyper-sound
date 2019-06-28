import BaseUnitGenerator from 'services/UnitGenerators/BaseUnitGenerator';
import StereoPanner from 'services/audio/stereoPanner';
import UgenConnectinType from 'services/UgenConnection/UgenConnectionType';
import UgenConnection from 'services/UgenConnection/UgenConnection';
import SignalParameter, { InputType } from 'services/AudioParameter/SignalParameter';

export default class PatchPanner extends BaseUnitGenerator {
  constructor({ panValue, }) {
    super();
    const defaultPanValue = this._ifNumberOr(panValue, 0);
    this.stereoPanner = new StereoPanner(defaultPanValue);
    this.audioModel = new UgenConnection('STEREO_PANNER', this.stereoPanner, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);
    this.paramMap = {
      panValue: new SignalParameter(this.stereoPanner.getPanParam(), defaultPanValue, new InputType().numeric().message().signal().build()),
    };
  }

  static fromParams(params) {
    return new PatchPanner(params);
  }
}
