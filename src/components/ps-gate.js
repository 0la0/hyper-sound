import PsBase from './ps-base';
import Gain from '../services/audio/gain';
import buildGateNode from '../services/audio/gate';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';

export default class PsGate extends PsBase {
  static get tag() {
    return 'ps-gate';
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
