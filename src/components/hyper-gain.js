import HyperSoundBase from './hyper-base.js';
import Gain from '../services/audio/gain.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';

export default class HyperSoundGain extends HyperSoundBase {
  static get tag() {
    return 'h-gain';
  }

  static get observedAttributes() {
    return [ 'value' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const gain = new Gain();
    this.audioModel = new UgenConnection('GAIN', gain, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    this.paramMap = {
      value: new ContinuousParam({
        attrName: 'value',
        param: gain.getGainParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0.2,
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
