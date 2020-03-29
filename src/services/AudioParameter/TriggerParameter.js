import { Subscription } from 'sea';
import { audioEventBus } from '../EventBus.js';

const PARENTHESES = /\(([^)]+)\)/;

export default class TriggerParameter {
  constructor({ attrName, element, eventHandler, }) {
    this.attrName = attrName;
    this.element = element;
    this.eventHandler = eventHandler;
    setTimeout(() => this.setValue(element.getAttribute(attrName)));
  }

  disconnect() {
    this._teardownPreviousConnections();
    this.element = null;
    this.audioEventSubscription = null;
  }

  _teardownPreviousConnections() {
    if (this.audioEventSubscription) {
      audioEventBus.unsubscribe(this.audioEventSubscription);
    }
  }

  setValue(val) {
    this._teardownPreviousConnections();
    if (!val) {
      return;
    } 
    const match = val.match(PARENTHESES);
    const address = match ? match[1] : val;
    this.audioEventSubscription = new Subscription()
      .setAddress(address)
      .setOnNext(this.eventHandler);
    audioEventBus.subscribe(this.audioEventSubscription);
  }
}