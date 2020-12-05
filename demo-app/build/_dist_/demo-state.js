function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar, asyncStateVar } from './lit-state.js';

class DemoState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "counter", stateVar(0));

    _defineProperty(this, "data", asyncStateVar(() => this.getData(), 'loading...'));

    _defineProperty(this, "increaseCounter", () => {
      this.counter++;
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Math.random().toString().substr(2));
      }, 3000);
    });
  }

}

export const demoState = new DemoState();