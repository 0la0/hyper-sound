import { EventBus, GlobalEventBus } from 'sea';

const eventBus = new EventBus();
const audioEventBus = new GlobalEventBus();

export { audioEventBus, eventBus };
