import HyperSoundBase from './hyper-base.js';
import StereoPanner from '../services/audio/StereoPanner.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';

export default class HyperSoundGain extends HyperSoundBase {
  static get tag() {
    return 'h-pan';
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
