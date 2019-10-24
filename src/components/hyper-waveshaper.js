import HyperSoundBase from './hyper-base';
import Waveshaper from '../services/audio/Waveshaper';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';

export default class HyperSoundReverb extends HyperSoundBase {
  static get tag() {
    return 'h-waveshaper';
  }

  static get observedAttributes() {
    return [ 'type', 'wet' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const waveshaper = new Waveshaper('clip');
    this.audioModel = new UgenConnection('WAVESHAPER', waveshaper, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    this.paramMap = {
      type: {
        // one of: { squ, cube, cheb, sig, clip }
        setValue: type => waveshaper.setType(type),
      },
      wet: new ContinuousParam({
        attrName: 'wet',
        param: waveshaper.getWetParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0.5,
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
