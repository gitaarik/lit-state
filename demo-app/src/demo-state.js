import { LitState, stateVar, asyncStateVar } from './lit-state.js';


class DemoState extends LitState {

    counter = stateVar(0);
    data = asyncStateVar(this.getData, 'loading...');

    increase = () => {
        this.counter++;
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
