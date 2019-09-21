import { decodeAudioData } from './SampleLoader';
import { base64ToArrayBuffer } from '../../Math';
import crash from '../../../assets/crash.b64mp3';
import hatAccent from '../../../assets/hat_accent.b64mp3';
import hatClosed from '../../../assets/hat_closed.b64mp3';
import hatOpen from '../../../assets/hat_open.b64mp3';
import kick from '../../../assets/kick.b64mp3';
import snare from '../../../assets/snare.b64mp3';
import tomHigh from '../../../assets/tom_high.b64mp3';
import tomLow from '../../../assets/tom_low.b64mp3';

const fileMap = {
  crash,
  hatAccent,
  hatClosed,
  hatOpen,
  kick,
  snare,
  tomHigh,
  tomLow
};

export default function getDefaultSamples() {
  const loadSamples = Object.keys(fileMap).map(name => {
    const audioArrayBuffer = base64ToArrayBuffer(fileMap[name]);
    return decodeAudioData(audioArrayBuffer)
      .then(audioBuffer => ({ name, audioBuffer, }));
  });
  return Promise.all(loadSamples);
}
