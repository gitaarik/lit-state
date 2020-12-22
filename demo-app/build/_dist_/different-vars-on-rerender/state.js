function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar } from '../lit-state.js';
import { currentTime } from '../../web_modules/lit-element-demo-app-helpers.js';

class DemoState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "showVars", stateVar(1));

    _defineProperty(this, "counter1", stateVar(0));

    _defineProperty(this, "counter2", stateVar(0));
  }

}

export const demoState = new DemoState();