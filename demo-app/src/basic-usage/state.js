import { LitState, stateVar } from '@app/lit-state.js';


class DemoState extends LitState {
    counter = stateVar(0);
}


export const demoState = new DemoState();
