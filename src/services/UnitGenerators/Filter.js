import BaseUnitGenerator from 'services/UnitGenerators/BaseUnitGenerator';
import ResFilter from 'services/audio/resFilter';
import UgenConnectinType from 'services/UgenConnection/UgenConnectionType';
import UgenConnection from 'services/UgenConnection/UgenConnection';
import SignalParameter, { InputType } from 'services/AudioParameter/SignalParameter';

export default class PatchFilter extends BaseUnitGenerator {
  constructor({ type, frequency, q, }) {
    super();
    const defaultFrequency = this._ifNumberOr(frequency, 5000);
    const defaultQ = this._ifNumberOr(q, 1);
    this.filter = new ResFilter(type, defaultFrequency, defaultQ);
    this.audioModel = new UgenConnection('FILTER', this.filter, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);
    this.paramMap = {
      frequency: new SignalParameter(this.filter.getFilterParam(), defaultFrequency, new InputType().numeric().message().signal().build()),
      q: new SignalParameter(this.filter.getQParam(), defaultQ, new InputType().numeric().message().signal().build()),
    };
  }

  static fromParams(params) {
    return new PatchFilter(params);
  }
}
