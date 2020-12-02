# LitState

### Simple shared app state management for LitElement

LitState is like [MobX](https://mobx.js.org/) or
[Redux](https://redux.js.org/), but then for
[LitElement](https://lit-element.polymer-project.org/). Like LitElement and
[lit-html](https://lit-html.polymer-project.org/), it's tiny, simple, and
powerful.


## Minimal example


```javascript
import { LitState, stateVar, LitStateElement } from 'lit-element';

class MyState extends LitState {

    myCounter = stateVar('defaultValue');

    increase = () => {
        myCounter++;
    }

}

const myState = new MyState();


class MyElement extends LitStateElement {

    render() {
        return html`
            <h1>Counter: ${myState.myCounter}</h1>
            <button @click=${myState.increase}></button>
        `;
    }

}

class MyOtherElement extends LitStateElement {

    render() {
        return html`
            <h1>Counter: ${myState.myCounter}</h1>
            <button @click=${myState.increase}></button>
        `;
    }

}
```


Both components `MyElement` and `MyOtherElement` will automatically re-render
whenever `myCounter` increases.

In more technical words:

A `LitStateElement` will rerender when any `stateVar` - which it accessed in
the previous render cycle - changes.


## How does this work?

We use [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
objects to detect whenever a `stateVar` is get or set. During the render of a
`LitStateElement`, there is a recorder active that records any `stateVar` that
is accessed. Then the element observes those variables and rerenders itself
whenever one of them changes. The next render again records which `stateVar`s
are being used and observes them.


## Notes

- You always need to use `stateVar` inside a `LitState` derived class.

    The `LitState` class uses a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    object to track sets and gets of the class variables. The `stateVar()`
    function just makes it clear to `LitState` that this is a observable
    variable. That when it changes, the components that are observing these
    variables will get notified, so that they re-render themselves.

- You can create and use multiple `LitState` classes at the same time.

    It is even encouraged to keep things separate. You can of course have a big
    `LitState` class which contains all global app state variables. But it is
    probably cleaner if you categorize it into multiple smaller `LitState`
    classes. For example, you can put each one if a separate file, collected in
    a `state/` folder, and import them at the places you need.

- Only new assigns trigger a rerender. Updating a object/array won't trigger a rerender.

    Just like `LitElement`s
    [properties](https://lit-element.polymer-project.org/guide/properties),
    only a new assign of the property triggers a rerender. Doing something like
    this won't:

    ```javascript
    MyState extends LitState {
        myObj = stateVar({myKey: 'myValue'});
        myArray = stateVar(['one', 'two', 'three']);
    }

    myState = new MyState();
    myState.myObj.mykey = 'newValue';
    myState.myArray.push('four');
    ```

    Above code won't notify the observers of `MyState`. You'll instead need to
    assign a new object to the `stateVar`:

    ```javascript
    myState.myObj = {...myState.myObj, myKey: 'newValue'};
    myState.myArray = [...myState.myArray, 'four'];
    ```

    Watching for changes inside objects is very complex matter and would make
    LitState way more complicated than desirable. If you are interested in this
    kind of thing, check out
    [observable-slim](https://github.com/ElliotNB/observable-slim).


## Why anyway?

Re-usable components are great and we should use them a lot. When you're
building a complex application however, it is also desirable to have
application-specific components that might have application-specific
side-effects, like changing the global app state for example. And it is of
course desirable, that when this global app state changes, the components that
use this global app state are synchronized with it.

And you can also have a re-usable component that has several internal
sub-components. They all might need to share some common internal state.

LitState is created for these use cases.


## `asyncStateVar`

It's not uncommon for a modern web-app to have asynchronous functions. For
example, fetch some data from a REST API. It's also not uncommon that this data
is used in multiple components; a shared state.

Therefore `LitState` has a convenient way of dealing with asynchronous
functions. It's a special kind of `stateVar` called `asyncStateVar`.

It is used like this:

```javascript
import { LitState, asyncStateVar, LitStateElement } from 'lit-element';

class MyState extends LitState {

    myData = asyncStateVar(this.getData);

    getData() {
        //
    }

}

const myState = new MyState();


class MyElement extends LitStateElement {

    render() {
        return html`
        `;
    }

}
```
