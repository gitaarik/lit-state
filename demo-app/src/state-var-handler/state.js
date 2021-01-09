import { LitState, stateVar, StateVar } from '@app/lit-state.js';


class LocalStorageHandler extends StateVar {

    constructor(args) {
        super(args);
        this.value = (
            localStorage.getItem(this.options.localStorageKey)
            || this.options.initialValue
        );
    }

    set(value) {
        super.set(value);
        localStorage.setItem(this.options.localStorageKey, value);
    }

}


function localStorageStateVar(options) {
    return stateVar(Object.assign(
        {handler: LocalStorageHandler},
        options
    ));
}


class DemoState extends LitState {

    @localStorageStateVar({
        localStorageKey: 'counter',
        initialValue: 0
    })
    counter;

}


export const demoState = new DemoState();
