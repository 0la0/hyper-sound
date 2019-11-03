import audioGraph from './Graph';
import { AsrEnvelope } from './Envelope';
import sampleBank from './sampleBank';
import { ftom } from '../midi/util';

const semitoneRatio = Math.pow(2, 1 / 12);

export function previewSample(sampleKey) {
  const audioBuffer = sampleBank.getAudioBuffer(sampleKey);
  if (!audioBuffer) { return; }
  const sampler = audioGraph.getAudioContext().createBufferSource();
  sampler.buffer = audioBuffer;
  sampler.connect(audioGraph.getOutput());
  sampler.onended = () => sampler.disconnect();
  sampler.start(0);
}

export default function playSample(sampleKey, timestamp, startOffset, frequency, asr, outputs) {
  const audioBuffer = sampleBank.getAudioBuffer(sampleKey);
  if (!audioBuffer) { return; }
  const sampler = audioGraph.getAudioContext().createBufferSource();
  const startTime = audioGraph.getAudioTimeForTimestamp(timestamp);
  const envelope = new AsrEnvelope(asr.attack, asr.sustain, asr.release)
    .build(startTime);
  sampler.connect(envelope);
  outputs.forEach(output => envelope.connect(output));
  sampler.buffer = audioBuffer;
  sampler.playbackRate.value = Math.pow(semitoneRatio, ftom(frequency) - 60);
  sampler.onended = () => envelope.disconnect();
  sampler.start(startTime, startOffset);
}
