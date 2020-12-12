import { LitState, stateVar, asyncStateVar } from '@app/lit-state.js';
import { currentTime } from '@app/utils.js'


class DemoState extends LitState {

    showVars = stateVar(1);
    counter1 = stateVar(0);
    counter2 = stateVar(0);

    data1 = asyncStateVar(
        () => this._getData1(),
        currentTime()
    );

    data2 = asyncStateVar(
        () => this._getData2(),
        currentTime()
    );

    _getData1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(currentTime());
            }, 3000);
        });
    }

    _getData2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(currentTime());
            }, 3000);
        });
    }

}


export const demoState = new DemoState();
