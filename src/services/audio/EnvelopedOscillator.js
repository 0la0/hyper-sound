import audioGraph from './Graph';
import { AsrEnvelope } from './Envelope';
import applyTypeToOscillator from './OscillatorUtil';

export default function envelopedOscilator(frequency, timestamp, asr, type, gain, outputs, modulator) {
  const startTime = audioGraph.getAudioTimeForTimestamp(timestamp);
  const endTime = startTime + asr.attack + asr.sustain + asr.release;
  const osc = audioGraph.getAudioContext().createOscillator();
  const envelope = new AsrEnvelope(asr.attack, asr.sustain, asr.release).build(startTime, gain);
  applyTypeToOscillator(osc, type);
  osc.frequency.value = frequency;
  osc.connect(envelope);
  outputs.forEach(output => envelope.connect(output));
  if (modulator) {
    modulator.forEach ?
      modulator.forEach(connectTo => connectTo(osc.frequency)) :
      modulator.connect(osc.frequency);
  }
  osc.onended = () => envelope.disconnect();
  osc.start(startTime);
  osc.stop(endTime);
}
