import { LitState, stateVar } from './lit-state.js';


class CounterState extends LitState {

    counter = stateVar(0);

    increase = () => {
        this.counter++;
    }

}


export const counterState = new CounterState();
