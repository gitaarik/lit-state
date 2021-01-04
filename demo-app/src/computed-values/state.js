import { LitState, stateVar } from '@app/lit-state.js';


class DemoState extends LitState {

    @stateVar() number1 = 0;
    @stateVar() number2 = 0;

    get sum() {
        return this.number1 + this.number2;
    }

    increaseBoth() {
        this.number1++;
        this.number2++;
    }

}


export const demoState = new DemoState();
