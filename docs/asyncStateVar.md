# `asyncStateVar` usage

It's not uncommon for a modern web-app to have asynchronous data. For example:
when the page loads you want to fetch some data from a REST API. It's also not
uncommon that this data is used in multiple components; a shared state.

Therefore `LitState` has a convenient way of dealing with asynchronous data.
It's a special kind of `stateVar` called `asyncStateVar`.

The `asyncStateVar()` function takes as its first argument a function that
returns a promise. When the variable is used in a component, the promise will
automatically be executed. When it is resolved or rejected, the component that
uses the variable will automatically re-render.

Here is a state class with an `asyncStateVar`:

```javascript
import { LitState, asyncStateVar } from 'lit-element-state';

class MyState extends LitState {

    myData = asyncStateVar(() => this._getData());

    _getData() {

        return new Promise((resolve, reject) => {

            fetchDataFromApi().then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });

        });

    }

}

export const myState = new MyState();
```

In the component, you can check the status of the promise with the functions
`isPending()`, `isRejected()` and `isFulfilled()` on the `asyncStateVar`. For
example: `myState.myData.isPending()`. Based on the status of the promise you
can then either call `getValue()` or `getError()`. `getError()` returns the
error in case a promise was rejected:

```javascript
import { LitStateElement } from 'lit-element-state';
import { myState } from './my-state.js';

class MyElement extends LitStateElement {

    render() {
        if (myState.myData.isPending()) {
            return html`loading data...`;
        } else if (myState.myData.isRejected()) {
            return html`loading data failed with error: ${myState.myData.getError()}`;
        } else {
            return myState.myData.getValue();
        }
    }

}
```

This makes it very easy to handle asynchronous data in your UI.


## Asynchronous updates

Besides fetching data from an API, we also might want to update the data. In
this case, we write our state class like this:

```javascript
import { LitState, asyncStateVar } from 'lit-element-state';

class MyState extends LitState {

    myData = asyncStateVar({
        get: () => this._getData(),
        set: value => this._setData(value),
        default: 'default value' // optional
    });

    _getData() {

        return new Promise((resolve, reject) => {

            fetchDataFromApi().then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });

        });

    }

    _setData(value) {

        return new Promise((resolve, reject) => {

            sendDataToApi(value).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });

        });

    }

}

export const myState = new MyState();
```

Use the following methods to check the status of the promise(s):

```javascript
isPending()         // 'get' or 'set' is pending
isPendingGet()      // 'get' is pending
isPendingSet()      // 'set' is pending

isRejected()        // 'get' or 'set' is rejected
isRejectedGet()     // 'get' is rejected
isRejectedSet()     // 'set' is rejected

getError()          // 'get' or 'set' error (if any)
getErrorGet()       // 'get' error (if any)
getErrorSet()       // 'set' error (if any)

isFulfilled()       // 'get' or 'set' is fulfilled
isFulfilledGet()    // 'get' is fulfilled
isFulfilledSet()    // 'set' is fulfilled
```

Also check the [demo app](https://gitaarik.github.io/lit-state/demo-app/build/)
to see how `asyncStateVar` works.
