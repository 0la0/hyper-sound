import { eventBus } from 'services/EventBus';
import Subscription from 'services/EventBus/Subscription';
// import { componentState, } from './componentManager';

let allDefined = false;

export default class PsBase extends HTMLElement {
  constructor() {
    super();
    console.log('allDefined?', allDefined);
    if (!allDefined) {
      const innerHTML = this.innerHTML;
      console.log('innerHtML', this, this.innerHTML)
      const dataStoreSubscription = new Subscription('DATA_STORE', (obj) => {
        if (obj.dataStore.componentsDefined) {
          allDefined = true;
          eventBus.unsubscribe(dataStoreSubscription);
          this.innerHTML = innerHTML;
          console.log('reset InnerHTML');
        }
      });
      eventBus.subscribe(dataStoreSubscription);
      this.innerHTML = '';
      console.log('clearInnerHTML');
    }
  }

  connectedCallback() {
    console.log('BaeComponent.connectedCallback')
  }
}
