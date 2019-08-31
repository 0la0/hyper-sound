import audioGraph from 'services/audio/Graph';
import {mtof} from 'services/midi/util';
import { AsrEnvelope } from 'services/audio/Envelope';
import applyTypeToOscillator from './OscillatorUtil';

// TODO: change midi note param to frequency
export default function envelopedOscilator(midiNote, timestamp, asr, type, gain, outputs, modulator) {
  const frequency = mtof(midiNote);
  // console.log('enveloped osc', startTime)
  // const startTime = startTime || audioGraph.getCurrentTime();
  const startTime = audioGraph.getAudioTimeForTimestamp(timestamp);
  console.log('startTime?', startTime);
  // const startTime = audioGraph.getCurrentTime();
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
