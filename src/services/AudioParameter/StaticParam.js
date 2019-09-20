export default class StaticParameter {
  constructor({ attrName, setter, defaultValue, element, }) {
    this.attrName = attrName;
    this.setter = setter;
    this.defaultValue = defaultValue;
    this.element = element;
    setTimeout(() => this.setValue(element.getAttribute(attrName)));
  }

  disconnect() {
    this.element = null;
  }

  _setDefaultValue() {
    this.setValue(this.defaultValue);
  }

  setValue(val) {
    if (val === null || val === undefined) {
      return this._setDefaultValue();
    }
    this.setter(val);
  }
}