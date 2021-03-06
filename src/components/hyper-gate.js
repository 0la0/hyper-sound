import HyperSoundBase from './hyper-base.js';
import Gain from '../services/audio/gain.js';
import buildGateNode from '../services/audio/gate.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';

export default class HyperSoundGate extends HyperSoundBase {
  static get tag() {
    return 'h-gate';
  }

  static get observedAttributes() {
    return [ 'value' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.audioModel = new UgenConnection('GATE_PROXY', new Gain(), UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);
    
    buildGateNode()
      .then((gate) => {
        this.gateAudioModel = new UgenConnection('GATE', gate, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

        this.paramMap = {
          value: new ContinuousParam({
            attrName: 'value',
            param: gate.getThresholdParam(),
            inputType: new InputType().numeric().message().signal(),
            defaultValue: 0.5,
            element: this,
          }),
        };
        batchRender(() => {
          this.audioModel.connectTo(this.gateAudioModel);
          if (this.parentNode.audioModel) {
            this.gateAudioModel.connectTo(this.parentNode.audioModel);
          }
        });
      })
      .catch((error) => {
        console.log('gateError', error);
        batchRender(() => {
          if (this.parentNode.audioModel) {
            this.audioModel.connectTo(this.parentNode.audioModel);
          }
        });
      });
  }
}
