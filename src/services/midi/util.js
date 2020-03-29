import frequencySetting from '../Frequency.js';

const midiA4 = 69;

export function mtof(midiNote) {
  const freqA4 = frequencySetting.getBaseFrequency();
  return freqA4 * Math.pow(2, (midiNote - midiA4) / 12);
}

export function ftom(frequency) {
  const freqA4 = frequencySetting.getBaseFrequency();
  return midiA4 + Math.round(12 * Math.log2(frequency / freqA4));
}
