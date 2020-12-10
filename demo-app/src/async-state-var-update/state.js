import { LitState, asyncStateVar } from '../lit-state.js';
import { currentTime } from './utils.js'


class DemoState extends LitState {

    data = asyncStateVar({
        get: () => this._getData(),
        set: value => this._setData(value),
        default: "[default value]"
    });

    _simulateError = false;

    _getData() {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if (this._simulateError) {
                    reject("fake load data error");
                    this._simulateError = false;
                } else {
                    resolve(this._fakeApiResponse());
                }

            }, 3000);

        });

    }

    _setData(value) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if (this._simulateError) {
                    reject("fake update data error");
                    this._simulateError = false;
                } else {
                    this._fakeApiResponseText = value;
                    resolve(this._fakeApiResponse());
                }

            }, 3000);

        });

    }

    _fakeApiResponseText = "Hello world";

    _fakeApiResponse() {
        return this._fakeApiResponseText + " (" + currentTime() + ")";
    }

    simulateErrorReload() {
        this._simulateError = true;
        this.data.reload();
    }

    simulateErrorUpdate() {
        this._simulateError = true;
        this.data.setValue("This value won't be set, because our fake API will fail.");
    }

}


export const demoState = new DemoState();
