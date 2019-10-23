import HyperSoundBase from './ps-base';
import Filter from '../services/audio/Filter';
import UgenConnectinType from '../services/UgenConnection/UgenConnectionType';
import UgenConnection from '../services/UgenConnection/UgenConnection';
import { InputType, } from '../services/AudioParameter/InputType';
import { batchRender, } from '../services/TaskScheduler';
import ContinuousParam from '../services/AudioParameter/ContinuousParam';
import StaticParam from '../services/AudioParameter/StaticParam';

export default class HyperSoundFilter extends HyperSoundBase {
  static get tag() {
    return 'h-filter';
  }

  static get observedAttributes() {
    return [ 'type', 'frequency', 'q', 'gain', ];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('filterConnected');
    const filter = new Filter({});
    this.audioModel = new UgenConnection('FILTER', filter, UgenConnectinType.SIGNAL, UgenConnectinType.SIGNAL);

    this.paramMap = {
      type: new StaticParam({
        attrName: 'type',
        setter: type => filter.setTypeParam(type),
        defaultValue: 'lowpass',
        element: this,
      }),
      frequency: new ContinuousParam({
        attrName: 'frequency',
        param: filter.getFrequencyParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 440,
        element: this,
      }),
      q: new ContinuousParam({
        attrName: 'q',
        param: filter.getQParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 1,
        element: this,
      }),
      gain: new ContinuousParam({
        attrName: 'gain',
        param: filter.getGainParam(),
        inputType: new InputType().numeric().message().signal(),
        defaultValue: 1,
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
