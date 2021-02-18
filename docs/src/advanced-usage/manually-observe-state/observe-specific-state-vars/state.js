import { LitState, stateVar } from '@app/lit-state.js';


class DemoState extends LitState {
    @stateVar() counter1 = 0;
    @stateVar() counter2 = 0;
}


export const demoState = new DemoState();
