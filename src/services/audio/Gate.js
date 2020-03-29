import audioGraph from './Graph.js';
import { getWorklet } from './WorkletUtil.js';

class Gate  {
  constructor(gateNode) {
    this.gateNode = gateNode;
  }

  connect(node) {
    this.gateNode.connect(node);
  }

  disconnect(node) {
    this.gateNode.disconnect(node);
  }

  getInput() {
    return this.gateNode;
  }

  getThresholdParam() {
    return this.gateNode.parameters.get('threshold');
  }
}

export default function buildGateNode() {
  return getWorklet(audioGraph.getAudioContext(), 'Gate')
    .then(gateNode => new Gate(gateNode));
}
