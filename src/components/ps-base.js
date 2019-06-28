import { eventBus } from 'services/EventBus';
import Subscription from 'services/EventBus/Subscription';
// import { componentState, } from './componentManager';

let allDefiend = false;

export default class PsBase extends HTMLElement {
  constructor() {
    super();
    if (!allDefiend) {
      const innerHTML = this.innerHTML;
      const dataStoreSubscription = new Subscription('DATA_STORE', (obj) => {
        if (obj.dataStore.componentsDefined) {
          allDefiend = true;
          eventBus.unsubscribe(dataStoreSubscription);
          this.innerHTML = innerHTML;
        }
      });
      eventBus.subscribe(dataStoreSubscription);
      this.innerHTML = '';
    }
  }

  connectedCallback() {
    console.log('BaeComponent.connectedCallback')
  }
}
