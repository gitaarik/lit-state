import { LitState, asyncStateVar } from '../lit-state.js';
import { currentTime } from '@app/utils.js'


class DemoState extends LitState {

    data = asyncStateVar(() => this._getData(), '[default value]');

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

    _fakeApiResponseText = "Hello world";

    _fakeApiResponse() {
        return this._fakeApiResponseText + " (" + currentTime() + ")";
    }

    simulateErrorReload() {
        this._simulateError = true;
        this.data.reload();
    }

}


export const demoState = new DemoState();
