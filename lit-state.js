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
        if (!this.isConnected) return;
        this._addStateObservers(stateRecorder.finish());
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
        this._observers = [];

        return new Proxy(this, {

            set: (obj, key, value) => {

                if (this._isStateVar(key)) {
                    const return_value = obj[key]._handleSet(value)
                    if (return_value !== undefined) {
                        return return_value;
                    }
                } else if (value instanceof BaseStateVar) {
                    this._stateVars.push(key);
                    value._recordRead = () => this._recordRead(key);
                    value._notifyChange = () => this._notifyChange(key);
                    obj[key] = value;
                } else {
                    obj[key] = value;
                }

                return true;

            },

            get: (obj, key) => {

                if (obj._isStateVar(key)) {
                    return obj[key]._handleGet();
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

    _recordRead(key) {
        stateRecorder.recordRead(this, key);
    }

    _notifyChange(key) {
        for (const observerObj of this._observers) {
            if (!observerObj.keys || observerObj.keys.includes(key)) {
                observerObj.observer(key);
            }
        };
    }

}


export class BaseStateVar {
    _handleGet() {}
    _handleSet(value) {}
}


class StateVar extends BaseStateVar {

    constructor(initialValue) {
        super();
        this._value = initialValue;
    }

    _handleGet() {
        this._recordRead();
        return this._value;
    }

    _handleSet(value) {
        if (this._value !== value) {
            this._value = value;
            this._notifyChange();
        }
    }

}


export function stateVar(defaultValue) {
    return new StateVar(defaultValue);
}


class AsyncStateVar extends BaseStateVar {

    constructor(promise, defaultValue) {
        super();
        this._promise = promise;
        this._defaultValue = defaultValue;
        this._init();
    }

    _init() {
        this._initiatedGet = false;
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
    }

    _getDefaultValue() {
        if (typeof this._promise && 'default' in this._promise) {
            return this._promise.default;
        } else {
            return this._defaultValue;
        }
    }

    _handleGet() {
        this.initGet();
        return this;
    }

    _handleSet(value) {
        throw (
            "Can't assign to an asyncStateVar. If you want to set a new " +
            "value, use setValue(value), or setCache(value) and pushCache()."
        );
    }

    initGet() {

        if (this._initiatedGet) {
            return;
        }

        this._initiatedGet = true;
        this._loadValue();

    }

    _loadValue() {

        this._pendingGet = true;
        this._rejectedGet = false;
        this._fulfilledGet = false;
        this._fulfilledGet = false;
        this._notifyChange();

        this._getPromise().then(value => {
            this._fulfilledGet = true;
            this._value = value;
            this._errorGet = null;
            this._pendingCache = false;
        }).catch(error => {
            this._rejectedGet = true;
            this._errorGet = error;
        }).finally(() => {
            this._pendingGet = false;
            this._rejectedSet = false;
            this._notifyChange();
        });

    }

    isPending() {
        return this.isPendingGet() || this.isPendingSet();
    }

    isPendingGet() {
        this._recordRead();
        return this._pendingGet;
    }

    isPendingSet() {
        this._recordRead();
        return this._pendingSet;
    }

    isPendingCache() {
        this._recordRead();
        return this._pendingCache;
    }

    isRejected() {
        return this.isRejectedGet() || this.isRejectedSet();
    }

    isRejectedGet() {
        this._recordRead();
        return this._rejectedGet;
    }

    isRejectedSet() {
        this._recordRead();
        return this._rejectedSet;
    }

    getError() {
        return this.getErrorGet() || this.getErrorSet();
    }

    getErrorGet() {
        this._recordRead();
        return this._errorGet;
    }

    getErrorSet() {
        this._recordRead();
        return this._errorSet;
    }

    isFulfilled() {
        return this.isFulfilledGet() || this.isFulfilledSet();
    }

    isFulfilledGet() {
        this._recordRead();
        return this._fulfilledGet;
    }

    isFulfilledSet() {
        this._recordRead();
        return this._fulfilledSet;
    }

    getValue() {
        this._recordRead();
        return this._value;
    }

    setValue(value) {

        this._pendingSet = true;
        this._fulfilledSet = false;
        this._fulfilledGet = false;
        this._rejectedSet = false;

        this._notifyChange();

        this._setPromise(value).then(value => {
            this._fulfilledSet = true;
            this._value = value;
            this._pendingCache = false;
        }).catch(error => {
            this._rejectedSet = true;
            this._errorSet = error;
        }).finally(() => {
            this._pendingSet = false;
            this._rejectedGet = false;
            this._notifyChange();
        });

    }

    setCache(value) {
        this._value = value;
        this._pendingCache = true;
        this._notifyChange();
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

    recordRead(stateObj, key) {
        if (this._log === null) return;
        const keys = this._log.get(stateObj) || [];
        if (!keys.includes(key)) keys.push(key);
        this._log.set(stateObj, keys);
    }

    finish() {
        const stateVars = this._log;
        this._log = null;
        return stateVars;
    }

}

export const stateRecorder = new StateRecorder();
