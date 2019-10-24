import HyperSoundBase from './hyper-base';
import Gain from '../services/audio/gain';
import buildBitcrusher from '../services/audio/BitCrusher';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';

export default class HyperSoundCrush extends HyperSoundBase {
  static get tag() {
    return 'h-crush';
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
