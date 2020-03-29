import UgenConnectionType from '../UgenConnection/UgenConnection.js';

const InputTypes = {
  NUMERIC: 'NUMERIC',
  MESSAGE: UgenConnectionType.MESSAGE,
  SIGNAL: UgenConnectionType.SIGNAL,
};

export class InputType {
  constructor() {
    this.inputTypes = [];
    this.isNumeric = false;
    this.isMessage = false;
    this.isSignal = false;
  }

  numeric() {
    this.inputTypes.push(InputTypes.NUMERIC);
    this.isNumeric = true;
    return this;
  }

  message() {
    this.inputTypes.push(InputTypes.MESSAGE);
    this.isMessage = true;
    return this;
  }

  signal() {
    this.inputTypes.push(InputTypes.SIGNAL);
    this.isSignal = true;
    return this;
  }

  build() {
    return this.inputTypes;
  }
}
