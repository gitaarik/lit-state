function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar } from '../lit-state.js';

class ParentState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "childState1", stateVar());

    _defineProperty(this, "childState2", stateVar());
  }

}

class ChildState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "counter", stateVar(0));
  }

}

export const parentState = new ParentState();
const childState1 = new ChildState();
const childState2 = new ChildState();
childState1.counter = 1;
childState2.counter = 1000;
parentState.childState1 = childState1;
parentState.childState2 = childState2;