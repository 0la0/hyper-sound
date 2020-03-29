import audioGraph from './Graph.js';

export default function envelopedNoiseGenerator(timestamp, asr, gain, outputs) {
  const startTime = audioGraph.getAudioTimeForTimestamp(timestamp);
  const endTime = startTime + asr.attack + asr.sustain + asr.release;
  const totalTimeMs = (asr.attack + asr.sustain + asr.release) * 1000;
  const noiseGenerator = new AudioWorkletNode(audioGraph.getAudioContext(), 'NoiseGenerator');
  const noiseAmplitude = noiseGenerator.parameters.get('amplitude');
  noiseAmplitude.setValueAtTime(0, startTime);
  noiseAmplitude.linearRampToValueAtTime(gain, startTime + asr.attack);
  noiseAmplitude.linearRampToValueAtTime(gain, startTime + asr.attack + asr.sustain);
  noiseAmplitude.linearRampToValueAtTime(0, endTime);
  outputs.forEach(output => noiseGenerator.connect(output));
  setTimeout(() => noiseGenerator.disconnect(), totalTimeMs + 1000);
}
