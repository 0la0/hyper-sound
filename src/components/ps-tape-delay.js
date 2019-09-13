import PsBase from './ps-base';
import TapeDelay from '../services/audio/TapeDelay';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/SignalParameter';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../util/ContinuousParam';

export default class PsTapeDelay extends PsBase {
  static get tag() {
    return 'ps-tape-delay';
  }

  static get observedAttributes() {
    return [ 'delay', 'feedback', 'wet' ];
  }

  connectedCallback() {
    super.connectedCallback();
    const delay = new TapeDelay();
    this.audioModel = new UgenConnection('DELAY', delay, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    this.paramMap = {
      delay: new ContinuousParam({
        attrName: 'delay',
        param: delay.getDelayParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0,
        element: this,
      }),
      feedback: new ContinuousParam({
        attrName: 'feedback',
        param: delay.getFeedbackParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 0.2,
        element: this,
      }),
      wet: new ContinuousParam({
        attrName: 'wet',
        param: delay.getWetParam(),
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
