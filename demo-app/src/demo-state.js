import { LitState, stateVar, asyncStateVar } from 'lit-element-state';


class DemoState extends LitState {

    counter = stateVar(0);
    data = asyncStateVar(() => this.getData(), 'loading...');

    increaseCounter = () => {
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
