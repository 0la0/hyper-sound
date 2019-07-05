import PeriodicWave from './PeriodicWave';
import wavetables from './Wavetables';

const periodicWaves = {};

export function getPeriodicWave(waveform) {
  if (!wavetables[key]) {
    return;
  }
  if (!periodicWaves[waveform]) {
    const periodicWave = new PeriodicWave(waveform);
    periodicWaves[waveform] = periodicWave;
  }
  return periodicWaves[waveform];
}
