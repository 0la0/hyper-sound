const workletFilenames = [
  'BitcrusherWorklet',
  'GateWorklet',
  'NoiseGeneratorWorklet',
  'ThresholdEventWorklet',
];

export default function initAudioWorklets(audioContext) {
  if (!audioContext.audioWorklet) {
    console.log('Audio worklets not supported'); // eslint-disable-line no-console
    return;
  }
  const basePath = '/worklets/'; // TODO: use hosting domain
  const loadAllWorklets = workletFilenames.map(fileName =>
    audioContext.audioWorklet.addModule(`${basePath}${fileName}.js`));
  Promise.all(loadAllWorklets)
    .then(() => console.log('worklets loaded'))
    .catch(error => console.log('audio worklet initializaiton error', error)); // eslint-disable-line no-console
}
