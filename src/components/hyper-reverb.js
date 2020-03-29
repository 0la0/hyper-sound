import HyperSoundBase from './hyper-base.js';
import Reverb from '../services/audio/Reverb.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';

export default class HyperSoundReverb extends HyperSoundBase {
  static get tag() {
    return 'h-reverb';
  }

  static get observedAttributes() {
    return [ 'attack', 'decay', 'wet' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const reverb = new Reverb();
    this.audioModel = new UgenConnection('REVERB', reverb, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    this.paramMap = {
      attack: {
        setValue: (stringValue) => {
          const val = parseFloat(stringValue, 10);
          reverb.setAttack(val);
        },
      },
      decay: {
        setValue: (stringValue) => {
          const val = parseFloat(stringValue, 10);
          reverb.setDecay(val);
        },
      },
      wet: new ContinuousParam({
        attrName: 'wet',
        param: reverb.getWetParam(),
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
