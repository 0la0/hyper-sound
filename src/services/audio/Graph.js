import initAudioWorklets from './WorkletUtil';

class AudioGraph {
  constructor () {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioCtx();
    this.masterCompressor = this.audioContext.createDynamicsCompressor();
    this.masterCompressor.connect(this.audioContext.destination);
    this.startTimestamp = 0;
    initAudioWorklets(this.audioContext);

    document.addEventListener('METRONOME_START', (event) => {
      this.startTimestamp = (event.detail.timestamp / 1000) - this.audioContext.currentTime;
    });
    document.addEventListener('METRONOME_STOP', () => console.log('audio graph stop'));
  }

  startContext() {
    if (this.audioContext.state === 'running') {
      return Promise.resolve();
    }
    return this.audioContext.resume();
  }

  getCurrentTime() {
    return this.audioContext.currentTime;
  }

  getAudioContext() {
    return this.audioContext;
  }

  getSampleRate() {
    return this.audioContext.sampleRate;
  }

  getOutput() {
    return this.masterCompressor;
  }

  getAudioTimeForTimestamp(timestamp) {
    return (timestamp / 1000) - this.startTimestamp;
  }
}

export default new AudioGraph();
