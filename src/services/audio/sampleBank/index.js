import { decodeAudioData } from './SampleLoader';
import { getDefaultSamples, getDefaultSampleNames } from './defaultSamples';

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

  getAudioBuffer(sampleKey) {
    return this.samples.get(sampleKey);
  }

  addSample(name, arrayBuffer) {
    if (typeof name !== 'string') {
      throw new TypeError(`SampleBank.addSample name must be string, recieved ${name}`);
    }
    if (!(arrayBuffer instanceof ArrayBuffer)) {
      throw new TypeError(`SampleBank.addSample must be arrayBuffer, recieved ${arrayBuffer}`);
    }
    return decodeAudioData(arrayBuffer)
      .then(audioBuffer => this.samples.set(name, audioBuffer))
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
    const audioBuffer = this.samples.get(oldName);
    this.samples.delete(oldName);
    this.samples.set(newName, audioBuffer);
  }
}

const sampleBank = new SampleBank();

export function loadDefaultSamples() {
  getDefaultSamples()
    .forEach(({ name, arrayBuffer }) => sampleBank.addSample(name, arrayBuffer));
}

export default sampleBank;
