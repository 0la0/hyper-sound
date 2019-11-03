class FrequencySetting {
  constructor() {
    this.baseFrequency = 440;
  }

  setBaseFrequency(baseFrequency) {
    if (typeof baseFrequency !== 'number') {
      throw new TypeError('BaseFrequency must be a number');
    }
    this.baseFrequency = baseFrequency;
  }

  getBaseFrequency() {
    return this.baseFrequency;
  }
}

const frequencySetting = new FrequencySetting();
export default frequencySetting;
