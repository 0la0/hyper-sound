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

export function getDefaultSampleNames() {
  return Object.keys(fileMap);
}

export function getDefaultSamples() {
  return Object.keys(fileMap).map(name => ({
    name,
    arrayBuffer: base64ToArrayBuffer(fileMap[name]),
  }));
}
