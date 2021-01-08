import { LitState, stateVar } from '@app/lit-state.js';


class DemoState extends LitState {
    @stateVar() counter = 0;
}


export const demoState = new DemoState();
