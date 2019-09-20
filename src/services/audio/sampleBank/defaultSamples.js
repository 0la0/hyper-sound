import loadSample from './SampleLoader';

const BASE_PATH = '/assets/';
const mp3 = '.mp3';

const fileMap = {
  crash: `${BASE_PATH}crash${mp3}`,
  hatAccent: `${BASE_PATH}hat_accent${mp3}`,
  hatClosed: `${BASE_PATH}hat_closed${mp3}`,
  hatOpen: `${BASE_PATH}hat_open${mp3}`,
  kick: `${BASE_PATH}kick${mp3}`,
  snare: `${BASE_PATH}snare${mp3}`,
  tomLow: `${BASE_PATH}tom_low${mp3}`,
  tomHigh: `${BASE_PATH}tom_high${mp3}`
};

export default function getDefaultSamples() {
  const loadSamples = Object.keys(fileMap).map(name =>
    loadSample(fileMap[name]).then(audioBuffer => ({ name, audioBuffer, })));
  return Promise.all(loadSamples);
}
