function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar } from '../lit-state.js';

class DemoState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "counter", stateVar(0));
  }

}

export const demoState = new DemoState();