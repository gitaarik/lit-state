import { LitElement } from '../web_modules/lit-element.js';
export const observeState = superclass => class extends superclass {
  constructor() {
    super();
    this._observers = [];
  }

  update(changedProperties) {
    stateRecorder.start();
    super.update(changedProperties);

    this._initStateObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._clearStateObservers();
  }

  _initStateObservers() {
    this._clearStateObservers();

    if (!this.isConnected) return;

    this._addStateObservers(stateRecorder.finish());
  }

  _addStateObservers(stateVars) {
    for (let [state, keys] of stateVars) {
      const observer = () => this.requestUpdate();

      this._observers.push([state, observer]);

      state.addObserver(observer, keys);
    }
  }

  _clearStateObservers() {
    for (let [state, observer] of this._observers) {
      state.removeObserver(observer);
    }

    this._observers = [];
  }

};
export const LitStateElement = observeState(LitElement);
export class LitState {
  constructor() {
    this._stateVars = [];
    this._observers = [];
    return new Proxy(this, {
      set: (obj, key, value) => {
        if (this._isStateVar(key)) {
          const return_value = obj[key]._handleSet(value);

          if (return_value !== undefined) {
            return return_value;
          }
        } else if (value instanceof BaseStateVar) {
          this._stateVars.push(key);

          value._recordRead = () => this._recordRead(key);

          value._notifyChange = () => this._notifyChange(key);

          obj[key] = value;
        } else {
          obj[key] = value;
        }

        return true;
      },
      get: (obj, key) => {
        if (obj._isStateVar(key)) {
          return obj[key]._handleGet();
        }

        return obj[key];
      }
    });
  }

  addObserver(observer, keys) {
    this._observers.push({
      observer,
      keys
    });
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(observerObj => observerObj.observer !== observer);
  }

  _isStateVar(key) {
    return this._stateVars.includes(key);
  }

  _recordRead(key) {
    stateRecorder.recordRead(this, key);
  }

  _notifyChange(key) {
    for (const observerObj of this._observers) {
      if (!observerObj.keys || observerObj.keys.includes(key)) {
        observerObj.observer(key);
      }
    }

    ;
  }

}
export class BaseStateVar {
  _handleGet() {}

  _handleSet(value) {}

}

class StateVar extends BaseStateVar {
  constructor(initialValue) {
    super();
    this._value = initialValue;
  }

  _handleGet() {
    this._recordRead();

    return this._value;
  }

  _handleSet(value) {
    if (this._value !== value) {
      this._value = value;

      this._notifyChange();
    }
  }

}

export function stateVar(defaultValue) {
  return new StateVar(defaultValue);
}

class StateRecorder {
  constructor() {
    this._log = null;
  }

  start() {
    this._log = new Map();
  }

  recordRead(stateObj, key) {
    if (this._log === null) return;
    const keys = this._log.get(stateObj) || [];
    if (!keys.includes(key)) keys.push(key);

    this._log.set(stateObj, keys);
  }

  finish() {
    const stateVars = this._log;
    this._log = null;
    return stateVars;
  }

}

export const stateRecorder = new StateRecorder();