import { LitState } from '@app/lit-state.js';


class DemoState extends LitState {

    static get stateVars() {
        return {
            counter: 0
        };
    }

}


export const demoState = new DemoState();
