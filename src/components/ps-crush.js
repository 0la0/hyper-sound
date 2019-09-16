import PsBase from './ps-base';
import Gain from '../services/audio/gain';
import buildBitcrusher from '../services/audio/BitCrusher';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/SignalParameter';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../util/ContinuousParam';

export default class PsCrush extends PsBase {
  static get tag() {
    return 'ps-crush';
  }

  static get observedAttributes() {
    return [ 'bit', 'redux', 'wet' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.audioModel = new UgenConnection('BIT_CRUSHER_PROXY', new Gain(), UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    buildBitcrusher()
      .then((bitCrusher) => {
        this.bitCrusherAudioModel = new UgenConnection('BIT_CRUSHER', bitCrusher, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);
        this.paramMap = {
          bit: new ContinuousParam({
            attrName: 'bit',
            param: bitCrusher.getBitDepthParam(),
            inputType: new InputType().numeric().message(),
            defaultValue: 8,
            element: this,
          }),
          redux: new ContinuousParam({
            attrName: 'redux',
            param: bitCrusher.getFrequencyReductionParam(),
            inputType: new InputType().numeric().message(),
            defaultValue: 0.5,
            element: this,
          }),
          wet: new ContinuousParam({
            attrName: 'wet',
            param: bitCrusher.getWetParam(),
            inputType: new InputType().numeric().message().signal(),
            defaultValue: 0.5,
            element: this,
          }),
        };
        batchRender(() => {
          this.audioModel.connectTo(this.bitCrusherAudioModel);
          if (this.parentNode.audioModel) {
            this.bitCrusherAudioModel.connectTo(this.parentNode.audioModel);
          }
        });
      })
      .catch((error) => {
        console.log('bitCrusherError', error);
        batchRender(() => {
          if (this.parentNode.audioModel) {
            this.audioModel.connectTo(this.parentNode.audioModel);
          }
        });
      });
  }
}
