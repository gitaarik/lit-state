function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    this._initStateVars();

    this._observers = [];
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

  _initStateVars() {
    for (let [name, options] of Object.entries(this.constructor.stateVars)) {
      this.constructor._initStateVar(name, options);
    }
  }

  static _initStateVar(name, options) {
    if (!options.handler) {
      options.handler = StateVar;
    }

    const key = `__${name}`;
    Object.defineProperty(this.prototype, name, {
      get() {
        return this[key]._handleGet();
      },

      set(value) {
        if (!(key in this)) {
          this[key] = new options.handler();

          this[key]._recordRead = () => this._recordRead(name);

          this[key]._notifyChange = () => this._notifyChange(name);

          this[key]._initialized = true;
        }

        return this[key]._handleSet(value);
      },

      configurable: true,
      enumerable: true
    });
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

_defineProperty(LitState, "stateVars", {});

export class BaseStateVar {
  constructor() {
    _defineProperty(this, "_initialized", false);
  }

  _handleGet() {}

  _handleSet(value) {}

}

class StateVar extends BaseStateVar {
  _handleGet() {
    this._recordRead();

    return this._value;
  }

  _handleSet(value) {
    if (this._value !== value) {
      this._value = value;

      this._notifyChange();
    }

    return true;
  }

}

export function stateVar(options = {}) {
  return element => {
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz._initStateVar(element.key, options);
      }

    };
  };
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