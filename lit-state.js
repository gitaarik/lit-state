import { LitElement } from 'lit-element';


export const LitStateElementMixin = superclass => class extends superclass {

    constructor() {
        super();
        this._observers = [];
    }

    update(changedProperties) {
        stateRecorder.start();
        super.update(changedProperties);
        this._initStateObservers();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearStateObservers();
    }

    _initStateObservers() {

        this._clearStateObservers();

        if (!this.isConnected) {
            return;
        }

        const stateVars = stateRecorder.finish();

        if (stateVars) {
            this._addStateObservers(stateVars);
        }

    }

    _addStateObservers(stateVars) {
        for (let [state, keys] of stateVars) {
            const observer = () => this._stateChangeCallback();
            this._observers.push([state, observer]);
            state.addObserver(observer, keys);
        }
    }

    _stateChangeCallback() {
        this.requestUpdate();
    }

    _clearStateObservers() {

        if (!this._observers.length) {
            return;
        }

        for (let [state, observer] of this._observers) {
            state.removeObserver(observer);
        }

        this._observers = [];

    }

}


export const LitStateElement = LitStateElementMixin(LitElement);


export class LitState {

    constructor() {

        this._stateVars = [];
        this._asyncStateVars = [];
        this._observers = [];

        return new Proxy(this, {

            set: (obj, key, value) => {

                if (this._isStateVar(key)) {
                    if (obj[key] !== value) {
                        obj[key] = value;
                        this._notifyObservers(key);
                    }
                } else if (value instanceof StateVar) {
                    this._stateVars.push(key);
                    obj[key] = value.initialValue;
                } else if (this._isAsyncStateVar(key)) {
                    throw (
                        "Can't assign to an asyncStateVar. If you want to " +
                        "set a new value, use setValue()."
                    );
                } else if (value instanceof AsyncStateVar) {

                    value.setLogStateVarCallback(() => {
                        stateRecorder.logStateVar(obj, key);
                    });

                    value.setOnChangeCallback(() => {
                        this._notifyObservers(key);
                    });

                    this._asyncStateVars.push(key);
                    obj[key] = value;

                } else {
                    obj[key] = value;
                }

                return true;

            },

            get: (obj, key) => {

                if (obj._isStateVar(key) || obj._isAsyncStateVar(key)) {
                    stateRecorder.logStateVar(obj, key);
                }

                if (obj._isAsyncStateVar(key) && !obj[key].isInitiated()) {
                    obj[key].initiate();
                }

                return obj[key];

            }

        });

    }

    addObserver(observer, keys) {
        this._observers.push({observer, keys});
    }

    removeObserver(observer) {
        this._observers = this._observers.filter(observerObj => observerObj.observer !== observer);
    }

    _isStateVar(key) {
        return this._stateVars.includes(key);
    }

    _isAsyncStateVar(key) {
        return this._asyncStateVars.includes(key);
    }

    _notifyObservers(key) {

        if (!this._observers.length) {
            return;
        }

        this._observers.forEach(observerObj => {
            if (!observerObj.keys || observerObj.keys.includes(key)) {
                observerObj.observer(key);
            }
        });

    }

}


class StateVar {
    constructor(initialValue) {
        this.initialValue = initialValue;
    }
}


export function stateVar(defaultValue) {
    return new StateVar(defaultValue);
}


class AsyncStateVar {

    constructor(promise, defaultValue) {
        this._promise = promise;
        this._defaultValue = defaultValue;
        this.init();
    }

    init() {
        this._initiated = false;
        this._pendingGet = false;
        this._pendingSet = false;
        this._pendingCache = false;
        this._fulfilledGet = false;
        this._fulfilledSet = false;
        this._rejectedGet = false;
        this._rejectedSet = false;
        this._errorGet = null;
        this._errorSet = null;
        this._value = this._getDefaultValue();
        this._onChangeCallback = null;
    }

    _getDefaultValue() {
        if (typeof this._promise && 'default' in this._promise) {
            return this._promise.default;
        } else {
            return this._defaultValue;
        }
    }

    setLogStateVarCallback(callback) {
        this._logStateVarCallback = callback;
    }

    setOnChangeCallback(callback) {
        this._onChangeCallback = callback;
    }

    isInitiated() {
        return this._initiated;
    }

    initiate() {
        this._initiated = true;
        this._loadValue();
    }

    _loadValue() {

        this._pendingGet = true;
        this._rejectedGet = false;
        this._fulfilledGet = false;
        this._fulfilledGet = false;
        this._onChangeCallback();

        this._getPromise().then(value => {
            this._fulfilledGet = true;
            this._rejectedSet = false;
            this._value = value;
            this._errorGet = null;
            this._pendingCache = false;
        }).catch(error => {
            this._rejectedGet = true;
            this._errorGet = error;
        }).finally(() => {
            this._pendingGet = false;
            this._onChangeCallback();
        });

    }

    isPending() {
        return this.isPendingGet() || this.isPendingSet();
    }

    isPendingGet() {
        return this._pendingGet;
    }

    isPendingSet() {
        return this._pendingSet;
    }

    isPendingCache() {
        return this._pendingCache;
    }

    isRejected() {
        return this.isRejectedGet() || this.isRejectedSet();
    }

    isRejectedGet() {
        return this._rejectedGet;
    }

    isRejectedSet() {
        return this._rejectedSet;
    }

    getError() {
        return this.getErrorGet() || this.getErrorSet();
    }

    getErrorGet() {
        return this._errorGet;
    }

    getErrorSet() {
        return this._errorSet;
    }

    isFulfilled() {
        return this.isFulfilledGet() || this.isFulfilledSet();
    }

    isFulfilledGet() {
        return this._fulfilledGet;
    }

    isFulfilledSet() {
        return this._fulfilledSet;
    }

    getValue() {
        this._logStateVarCallback();
        return this._value;
    }

    setValue(value) {

        this._pendingSet = true;
        this._fulfilledSet = false;
        this._fulfilledGet = false;
        this._rejectedSet = false;

        this._onChangeCallback();

        this._setPromise(value).then(value => {
            this._fulfilledSet = true;
            this._rejectedGet = false;
            this._value = value;
            this._pendingCache = false;
        }).catch(error => {
            this._rejectedSet = true;
            this._errorSet = error;
        }).finally(() => {
            this._pendingSet = false;
            this._onChangeCallback();
        });

    }

    setCache(value) {
        this._value = value;
        this._pendingCache = true;
        this._onChangeCallback();
    }

    pushCache() {
        this.setValue(this._value);
    }

    reload() {
        this._loadValue();
    }

    get _getPromise() {
        if (typeof this._promise === 'object') {
            if ('get' in this._promise) {
                return this._promise.get;
            } else {
                throw (
                    "asyncStateVar is an object, but has no `get` key. " +
                    "So can't handle a get on this asyncStateVar."
                );
            }
        } else {
            return this._promise;
        }
    }

    get _setPromise() {
        if (typeof this._promise === 'object') {
            if ('set' in this._promise) {
                return this._promise.set;
            } else {
                throw (
                    "asyncStateVar is an object, but has no `set` key. " +
                    "So can't handle a set on this asyncStateVar."
                );
            }
        } else {
            return this._promise;
        }
    }

}


export function asyncStateVar(promise, defaultValue) {
    return new AsyncStateVar(promise, defaultValue);
}


class StateRecorder {

    constructor() {
        this._log = null;
    }

    start() {
        this._log = new Map();
    }

    logStateVar(stateObj, key) {

        if (this._log === null) {
            return;
        }

        const keys = this._log.get(stateObj) || [];

        if (!keys.includes(key)) {
            keys.push(key);
        }

        this._log.set(stateObj, keys);

    }

    finish() {
        const stateVars = this._log;
        this._log = null;
        return stateVars;
    }

}

export const stateRecorder = new StateRecorder();
