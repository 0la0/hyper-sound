import assert from 'assert';
import parseCycle from '../src/services/EventCycle/Pattern/PatternStringParser';
import getRelativeCycle from '../src/services/EventCycle/Pattern/RelativeCycleBuilder';
import RelativeCycleElement from '../src/services/EventCycle/Pattern/RelativeCycleElement';
import { buildAudioEventsFromPattern } from '../src/services/EventCycle/Pattern/AudioEventBuilder';
import TimeSchedule from '../src/services/metronome/TimeSchedule';
import AudioEvent from '../src/services/EventBus/AudioEvent';

const BASE_ADDRESS = '';

// describe('CycleEvaluator', () => {
//   it('throws an error if the cycle is not an array', () => {
//     assert.throws(() => getRelativeCycle('[]'), Error, 'Cycle must be an array');
//     assert.throws(() => buildAudioEventsFromPattern('[]'), Error, 'Cycle must be an array');
//   });

//   it('returns an empty array', () => {
//     const parsedCycle = parseCycle('[]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, { audio: 0, midi: 0 }, 4);
//     assert.deepEqual(relativeCycle, []);
//     assert.deepEqual(cycleForTime, []);
//   });

//   it('returns a singleton', () => {
//     const parsedCycle = parseCycle('[ a ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(2, 2000), 4);
//     assert.deepEqual(relativeCycle, [ new RelativeCycleElement('a', 0) ]);
//     assert.deepEqual(cycleForTime, [ new AudioEvent('a', undefined, new TimeSchedule(2, 2000)) ]);
//   });

//   it('evenly divides time between two elements', () => {
//     const parsedCycle = parseCycle('[ a b ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(2, 2000), 4);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.5)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', undefined, new TimeSchedule(2, 2000)),
//       new AudioEvent('b', undefined, new TimeSchedule(4, 4000)),
//     ]);
//   });

//   it('evenly divides time between three elements', () => {
//     const parsedCycle = parseCycle('[ a b c ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(3, 3000), 3);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.333333),
//       new RelativeCycleElement('c', 0.666667)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', undefined, new TimeSchedule(3, 3000)),
//       new AudioEvent('b', undefined, new TimeSchedule(3.999999, 3999.999)),
//       new AudioEvent('c', undefined, new TimeSchedule(5.000001, 5000.001))
//     ]);
//   });

//   it('evenly divides time between four elements', () => {
//     const parsedCycle = parseCycle('[ a b c d ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(4, 4000), 2);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.25),
//       new RelativeCycleElement('c', 0.5),
//       new RelativeCycleElement('d', 0.75)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', undefined, new TimeSchedule(4, 4000)),
//       new AudioEvent('b', undefined, new TimeSchedule(4.5, 4500)),
//       new AudioEvent('c', undefined, new TimeSchedule(5, 5000)),
//       new AudioEvent('d', undefined, new TimeSchedule(5.5, 5500))
//     ]);
//   });

//   it('flattens nested cycles', () => {
//     const parsedCycle = parseCycle('[ [ a ] [ b ] ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(2, 2000), 1);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.5)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', undefined, new TimeSchedule(2, 2000)),
//       new AudioEvent('b', undefined, new TimeSchedule(2.5, 2500))
//     ]);
//   });

//   it('evenly divides time in nested cycles', () => {
//     const parsedCycle = parseCycle('[ [ a b c d ] [ 1 2 3 4 ] ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, 'base-address', new TimeSchedule(), 8);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.125),
//       new RelativeCycleElement('c', 0.25),
//       new RelativeCycleElement('d', 0.375),
//       new RelativeCycleElement('1', 0.5),
//       new RelativeCycleElement('2', 0.625),
//       new RelativeCycleElement('3', 0.75),
//       new RelativeCycleElement('4', 0.875)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', 60, new TimeSchedule(0, 0)),
//       new AudioEvent('b', 60, new TimeSchedule(1, 1000)),
//       new AudioEvent('c', 60, new TimeSchedule(2, 2000)),
//       new AudioEvent('d', 60, new TimeSchedule(3, 3000)),
//       new AudioEvent('base-address', 1, new TimeSchedule(4, 4000)),
//       new AudioEvent('base-address', 2, new TimeSchedule(5, 5000)),
//       new AudioEvent('base-address', 3, new TimeSchedule(6, 6000)),
//       new AudioEvent('base-address', 4, new TimeSchedule(7, 7000))
//     ]);
//   });

//   it('evenly divides time in nested cycles', () => {
//     const parsedCycle = parseCycle('[ a [ b [ c d ] ] ]').content;
//     const relativeCycle = getRelativeCycle(parsedCycle, 0, 1);
//     const cycleForTime = buildAudioEventsFromPattern(relativeCycle, BASE_ADDRESS, new TimeSchedule(0, 0), 8);
//     assert.deepEqual(relativeCycle, [
//       new RelativeCycleElement('a', 0),
//       new RelativeCycleElement('b', 0.5),
//       new RelativeCycleElement('c', 0.75),
//       new RelativeCycleElement('d', 0.875)
//     ]);
//     assert.deepEqual(cycleForTime, [
//       new AudioEvent('a', undefined, new TimeSchedule(0, 0)),
//       new AudioEvent('b', undefined, new TimeSchedule(4, 4000)),
//       new AudioEvent('c', undefined, new TimeSchedule(6, 6000)),
//       new AudioEvent('d', undefined, new TimeSchedule(7, 7000)),
//     ]);
//   });
// });
