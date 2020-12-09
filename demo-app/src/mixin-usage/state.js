import { LitState, stateVar } from '../lit-state.js';


class DemoState extends LitState {
    counter = stateVar(0);
}


export const demoState = new DemoState();
