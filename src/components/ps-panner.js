import PsBase from './ps-base';
import StereoPanner from '../services/audio/StereoPanner';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';

export default class PsGain extends PsBase {
  static get tag() {
    return 'ps-pan';
  }

  static get observedAttributes() {
    return [ 'value' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const stereoPanner = new StereoPanner();
    this.audioModel = new UgenConnection('PAN', stereoPanner, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);
    this.paramMap = {
      value: new ContinuousParam({
        attrName: 'value',
        param: stereoPanner.getPanParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0,
        element: this,
      }),
    };
    batchRender(() => {
      if (this.parentNode.audioModel) {
        this.audioModel.connectTo(this.parentNode.audioModel);
      }
    });
  }
}
