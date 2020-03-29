export default class ContinuousRoutingParam {
  constructor({ attrName, outletAudioModel, inputType, element, }) {
    this.attrName = attrName;
    this.outletAudioModel = outletAudioModel;
    this.inputType = inputType;
    this.element = element;
    this.elementMap = {};
    setTimeout(() => this.setValue(element.getAttribute(attrName)));
  }

  disconnect() {
    this._removeAll();
    this.element = null;
    this.outletAudioModel = null;
  }

  _addInlet(name) {
    const target = this.element.getRootNode().getElementById(name);
    if (!target) {
      console.log('target not found', name);
      return;
    }
    target.audioModel.connectTo(this.outletAudioModel);
    this.elementMap[name] = target;
  }

  _removeInlet(name) {
    this.elementMap[name].audioModel.disconnectFrom(this.outletAudioModel);
    delete this.elementMap[name];
  }

  _removeAll() {
    Object.keys(this.elementMap).forEach(key => this._removeInlet(key));
    this.elementMap = {};
  }

  setValue(val) {
    if (!val) {
      this._removeAll();
      return;
    }
    const values = val.trim().split(/\s+/);
    // remove old values
    Object.keys(this.elementMap)
      .filter(key => !values.includes(key))
      .forEach(key => this._removeInlet(key));
    // add new values
    values
      .filter(key => !this.elementMap[key])
      .forEach(key => this._addInlet(key));
  }
}