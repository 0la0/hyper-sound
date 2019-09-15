import PsBase from './ps-base';
import Waveshaper from '../services/audio/Waveshaper';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/SignalParameter';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../util/ContinuousParam';

export default class PsReverb extends PsBase {
  static get tag() {
    return 'ps-waveshaper';
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
