import PeriodicWave from './PeriodicWave.js';
import wavetables from './Wavetables.js';

const periodicWaves = {};

export function getPeriodicWave(waveform) {
  if (!wavetables[waveform]) {
    return;
  }
  if (!periodicWaves[waveform]) {
    const periodicWave = new PeriodicWave(wavetables[waveform]);
    periodicWaves[waveform] = periodicWave;
  }
  return periodicWaves[waveform];
}
