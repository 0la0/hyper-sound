import HyperSoundBase from './hyper-base.js';
import Gain from '../services/audio/gain.js';
import buildBitcrusher from '../services/audio/BitCrusher.js';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType.js';
import UgenConnection from '../services/UgenConnection/UgenConnection.js';
import { InputType, } from '../services/AudioParameter/InputType.js';
import { batchRender, } from '../services/TaskScheduler.js';
import ContinuousParam from '../services/AudioParameter/ContinuousParam.js';

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
