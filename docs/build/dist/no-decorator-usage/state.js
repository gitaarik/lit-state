import { LitState } from '../lit-state.js';

class DemoState extends LitState {
  static get stateVars() {
    return {
      counter: {}
    };
  }

  constructor() {
    super();
    this.counter = 0;
  }

}

export const demoState = new DemoState();