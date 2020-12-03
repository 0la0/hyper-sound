import { decodeAudioData } from './SampleLoader.js';
import { getDefaultSamples, getDefaultSampleNames } from './defaultSamples.js';

class AudioBufferContainer {
  constructor(arrayBuffer, audioBuffer) {
    this.arrayBuffer = arrayBuffer;
    this.audioBuffer = audioBuffer;
  }

  getArrayBuffer() {
    return this.arrayBuffer;
  }

  getAudioBuffer() {
    return this.audioBuffer;
  }
}

class SampleBank {
  constructor() {
    this.samples = new Map();
  }

  getSampleKeys() {
    return Array.from(this.samples.keys());
  }

  getNonDefaultSampleKeys() {
    const defaultSampleKeys = getDefaultSampleNames();
    return this.getSampleKeys()
      .filter(name => !defaultSampleKeys.includes(name));
  }

  getDefaultSampleKeys() {
    return getDefaultSampleNames();
  }

  getAudioBuffer(sampleKey) {
    const audioBufferContainer = this.samples.get(sampleKey);
    return audioBufferContainer && audioBufferContainer.getAudioBuffer();
  }

  getSampleArrayBuffer(sampleKey) {
    const audioBufferContainer = this.samples.get(sampleKey);
    if (!audioBufferContainer) {
      throw new Error(`Sample: ${sampleKey} does not exist`);
    }
    return audioBufferContainer.getArrayBuffer();
  }

  addSample(name, arrayBuffer) {
    if (typeof name !== 'string') {
      throw new TypeError(`SampleBank.addSample name must be string, recieved ${name}`);
    }
    if (!(arrayBuffer instanceof ArrayBuffer)) {
      throw new TypeError(`SampleBank.addSample must be arrayBuffer, recieved ${arrayBuffer}`);
    }
    const arrayBufferClone = arrayBuffer.slice(0);
    return decodeAudioData(arrayBuffer)
      .then(audioBuffer => {
        const audioBufferContainer = new AudioBufferContainer(arrayBufferClone, audioBuffer); 
        this.samples.set(name, audioBufferContainer);
      })
      .catch(error => console.log(`Error loading sample ${name}`, error));
  }

  removeSample(name) {
    this.samples.delete(name);
  }

  renameSample(oldName, newName) {
    if (typeof oldName !== 'string' || typeof newName !== 'string') {
      throw new TypeError(`SampleBank.renameSample expects two strings, recieved ${oldName}, ${newName}`);
    }
    if (!this.samples.has(oldName)) {
      throw new Error(`SampleBank.renameSample, ${oldName} does not exist`);
    }
    if (this.samples.has(newName)) {
      throw new Error(`SampleBank.renameSample, ${newName} already exists`);
    }
    const audioBufferContainer = this.samples.get(oldName);
    this.samples.delete(oldName);
    this.samples.set(newName, audioBufferContainer);
  }
}

const sampleBank = new SampleBank();

export function loadDefaultSamples() {
  getDefaultSamples()
    .forEach(({ name, arrayBuffer }) => sampleBank.addSample(name, arrayBuffer));
}

export default sampleBank;
