import eventGraphApi from 'services/EventCycle/AudioGraph/ExposedApi';
import { patternApi } from 'services/EventCycle/PatternFunctions/ExposedApi';
import { utilApi } from 'services/EventCycle/Util';

const patternFunctions = patternApi.map(ele => ele.fn);
const eventGraphFunctions = eventGraphApi.map(ele => ele.fn);
const utilFunctions = utilApi.map(ele => ele.fn);

const exposedApi = [].concat(patternFunctions, eventGraphFunctions, utilFunctions);
const apiNamespace = exposedApi.map(fn => fn.name).join(', ');

const exposedEventGraph = eventGraphApi.map(({ name, fn, }) => {
  return `
    function ${name}() {
      const graph = ${fn.name}.apply(undefined, arguments);
      audioGraphInlets.push(graph);
      return graph;
    }
  `;
}).join('');

export function evaluateUserInput(userInputString) {
  return Function(`
    'use strict';
    return (${apiNamespace}) => {
      const sequences = [];
      const audioGraphInlets = [];
      const seq = (...args) => sequences.push(args);
      ${exposedEventGraph}
      ${userInputString}
      return { sequences, audioGraphInlets };
    };
  `)()(...exposedApi);
}
