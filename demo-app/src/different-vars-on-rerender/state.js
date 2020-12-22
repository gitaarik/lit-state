import { LitState, stateVar } from '@app/lit-state.js';
import { currentTime } from 'lit-element-demo-app-helpers';


class DemoState extends LitState {
    showVars = stateVar(1);
    counter1 = stateVar(0);
    counter2 = stateVar(0);
}


export const demoState = new DemoState();
