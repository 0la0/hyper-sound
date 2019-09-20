import audioGraph from '../Graph';

export function decodeAudioData(compressedBuffer) {
  try {
    return audioGraph.getAudioContext().decodeAudioData(compressedBuffer);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Not enough arguments') {
      // safari syntax
      return new Promise((resolve, reject) => {
        audioGraph.getAudioContext().decodeAudioData(
          compressedBuffer,
          compressedBuffer => resolve(compressedBuffer),
          error => reject(error)
        );
      });
    } else {
      throw error;
    }
  }
}

export default function loadSample(sampleUrl) {
  return fetch(sampleUrl)
    .then(response => response.arrayBuffer())
    .then(decodeAudioData);
}
