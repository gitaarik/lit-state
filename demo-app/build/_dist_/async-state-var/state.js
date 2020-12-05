function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, asyncStateVar } from '../lit-state.js';
import { currentTime } from './utils.js';

class DemoState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "data", asyncStateVar({
      get: () => this._getData(),
      set: value => this._setData(value),
      default: "[default value]"
    }));

    _defineProperty(this, "_simulateError", false);

    _defineProperty(this, "_fakeApiResponseText", "Hello world");
  }

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

  _fakeApiResponse() {
    return this._fakeApiResponseText + " (" + currentTime() + ")";
  }

  simulateErrorReload() {
    this._simulateError = true;
    this.data.reload();
  }

  simulateErrorUpdate() {
    this._simulateError = true;
    this.data.setValue("This value won't be set, because our fake API will fail");
  }

}

export const demoState = new DemoState();