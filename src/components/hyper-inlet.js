import HyperSoundBase from './hyper-base';
import Gain from '../services/audio/gain';
import UgenConnectionType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';
import ContinuousRoutingParam from '../services/AudioParameter/ContinuousRoutingParam';

export default class HyperSoundInlet extends HyperSoundBase {
  static get tag() {
    return 'h-inlet';
  }

  static get observedAttributes() {
    return [ 'from', 'gain' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const gain = new Gain();
    this.audioModel = new UgenConnection('SOUNT_INLET', gain, UgenConnectionType.SIGNAL, UgenConnectionType.SIGNAL);
    this.paramMap = {
      gain: new ContinuousParam({
        attrName: 'gain',
        param: gain.getGainParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0.5,
        element: this,
      }),
      from: new ContinuousRoutingParam({
        attrName: 'from',
        outletAudioModel: this.audioModel,
        inputType: new InputType().signal(),
        element: this,
      }),
    };
    batchRender(() => {
      if (this.parentNode.audioModel) {
        this.audioModel.connectTo(this.parentNode.audioModel);
        console.log('connected', this.audioModel)
      }
    });
  }
}
