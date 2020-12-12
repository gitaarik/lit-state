function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar, asyncStateVar } from '../lit-state.js';
import { currentTime } from '../utils.js';

class DemoState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "showVars", stateVar(1));

    _defineProperty(this, "counter1", stateVar(0));

    _defineProperty(this, "counter2", stateVar(0));

    _defineProperty(this, "data1", asyncStateVar(() => this._getData1(), currentTime()));

    _defineProperty(this, "data2", asyncStateVar(() => this._getData2(), currentTime()));
  }

  _getData1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentTime());
      }, 3000);
    });
  }

  _getData2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(currentTime());
      }, 3000);
    });
  }

}

export const demoState = new DemoState();