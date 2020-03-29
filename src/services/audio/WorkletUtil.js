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

function loadWorklet(audioContext, workletName) {
  return new Promise((resolve, reject) => {
    try {
      const workletNode = new AudioWorkletNode(audioContext, workletName);
      console.log('WorketLoaded', workletNode);
      resolve(workletNode);
    } catch (error) {
      reject(error);
    }
  });
}

function loadWorkletWithRetry(audioContext, workletName, maxRetry, retryAttempt, retryTime) {
  return loadWorklet(audioContext, workletName)
    .catch((error) => {
      console.log('load worklet attempt failed');
      if (retryAttempt >= maxRetry) {
        return Promise.reject(error);
      }
      return new Promise((resolve) => {
        const nextAttemptNumber = retryAttempt + 1;
        const nextRetryTime = retryTime * 2;
        setTimeout(() => resolve(
          loadWorkletWithRetry(audioContext, workletName, maxRetry, nextAttemptNumber, nextRetryTime)
        ), retryTime);
      });
    });
}

export function getWorklet(audioContext, workletName) {
  const maxRetry = 5;
  const retryAttempts = 0;
  const retryTime = 100;
  return loadWorkletWithRetry(audioContext, workletName, maxRetry, retryAttempts, retryTime);
}