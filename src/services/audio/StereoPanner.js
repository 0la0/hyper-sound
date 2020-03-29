import audioGraph from './Graph.js';

export default class StereoPanner  {
  constructor (panValue) {
    const audioContext = audioGraph.getAudioContext();
    this.panNode = audioContext.createStereoPanner();
    this.panNode.pan.value = panValue || 0;
  }

  connect(node) {
    this.panNode.connect(node);
  }

  disconnect(node) {
    this.panNode.disconnect(node);
  }

  getInput() {
    return this.panNode;
  }

  getPanParam() {
    return this.panNode.pan;
  }
}
