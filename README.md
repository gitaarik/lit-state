# LitState

### Simple shared app state management for LitElement.

LitState automatically re-renders your LitElement components, when a shared app
state variable they use changes.

LitState is like [MobX](https://mobx.js.org/) or
[Redux](https://redux.js.org/), but then for
[LitElement](https://lit-element.polymer-project.org/). The difference is that
it is tiny, simple but still powerful, like LitElement and
[lit-html](https://lit-html.polymer-project.org/).


## Installation

```
npm install lit-element-state
```

*The name `lit-state` is unfortunately already taken on npm, so therefore the
slightly awkward package name.*


## Basic idea

You keep your shared state in a `LitState` derived class. This class contains
`stateVar` variables that contain the state. This class can also contain helper
functions that modify the state. Instead of extending your component from
`LitElement` you extend from `LitStateElement`. This makes your component
automatically re-render whenever a `stateVar` they use changes.


## Minimal example


```javascript
import { LitState, stateVar, LitStateElement } from 'lit-element-state';

class MyState extends LitState {

    myCounter = stateVar(0); // `0` is the default value

    increase() {
        this.myCounter++;
    }

}

const myState = new MyState();


class MyElement extends LitStateElement {

    render() {
        return html`
            <h1>Counter: ${myState.myCounter}</h1>
            <button @click=${this._handleClick}></button>
        `;
    }

    _handleClick() {
        myState.increase();
    }

}

class MyOtherElement extends LitStateElement {

    render() {
        return html`
            <h1>Counter: ${myState.myCounter}</h1>
            <button @click=${this._handleClick}></button>
        `;
    }

    _handleClick() {
        myState.increase();
    }

}
```


Both components `MyElement` and `MyOtherElement` will automatically re-render
whenever `myCounter` increases. It doesn't matter from which component you
modify `myState`.

In more technical words:

A `LitStateElement` will rerender when any `stateVar` - which it accessed in
the previous render cycle - changes.


## How does this work?


### Basics

The `LitState` class uses a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
to detect whenever a `stateVar` is get or set. During the render of a
`LitStateElement`, there is a recorder active that records any `stateVar` that
is accessed during the render of that component. At the end of the render, the
`LitStateElement` collects the recorded `stateVar` variables, observes them,
and rerenders itself whenever one of them changes. The next render it again
records which `stateVar` variables are being used and observes them. So if the
next render uses new `stateVars`, they will be observed.


### Implementation details

To re-render itself, a `LitStateElement` component calls LitElement's
[`this.requestUpdate()`](https://lit-element.polymer-project.org/api/classes/_lit_element_.litelement.html#requestupdate)
(with no arguments). This will enqueue an update request for the component. The
component will re-render at the end of the execution queue.
`this.requestUpdate()` can be called multiple times during a particular
JavaScript event (like a click), and it will only update the component once, at
the end of the execution queue. So it doesn't matter when it is called multiple
times when multiple `stateVar` variables are changed during a JavaScript event.
This is an optimization feature built-in in LitElement. LitElement uses this
optimization for it's own
[properties](https://lit-element.polymer-project.org/guide/properties). This
optimization works in the same way for LitState's `stateVar` variables.

Also, LitElement uses lit-html, which sees which parts of the template are
changed or not. And it will only re-render the HTML elements that have changes.


## Why anyway?

Re-usable components are great and we should use them a lot. When you're
building a complex application however, it is also desirable to have
application-specific components that might have application-specific
side-effects, like changing the global app state for example. And it is of
course desirable, that when this global app state changes, the components that
use this global app state are synchronized with it.

And you can also have a re-usable component that has several internal
sub-components. They all might need to share some common internal state.

LitState is created for these use cases, and is meant to make it as simple as
possible for the developer.


## Notes

### You always need to use `stateVar` inside a `LitState` derived class.

The `LitState` class uses a [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
object to track sets and gets of the class variables. The `stateVar()` function
makes it clear to `LitState` that this is a state containing variable, and it
makes it observable. When it changes, the components that are observing these
variables will get notified, so that they can re-render themselves.

### You can create and use multiple `LitState` classes at the same time.

It is even encouraged to keep things separate. You can of course have one big
`LitState` derived class which contains all global app state variables. But it
is probably cleaner if you categorize it into multiple smaller `LitState`
derived classes. For example, you can put each state class in a separate file,
collected in a `state/` folder, and import them at the places you need.

### Only new assigns trigger a rerender. Updating a object/array won't trigger a rerender.

Just like LitElement's
[properties](https://lit-element.polymer-project.org/guide/properties),
only a new assign of the `stateVar` triggers a rerender. Doing something like
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


## Easy handling of asynchronous data with `asyncStateVar`

It's not uncommon for a modern web-app to have asynchronous functions. For
example: fetch some data from a REST API. It's also not uncommon that this data
is used in multiple components; a shared state.

Therefore `LitState` has a convenient way of dealing with asynchronous
functions. It's a special kind of `stateVar` called `asyncStateVar`.

The `asyncStateVar()` function takes as its first argument a function that
returns a promise. When the variable is used in a template, the promise will
automatically be executed. When it is resolved or rejected, the template that
uses the variable will automatically re-render.

Here is a state class with an `asyncStateVar`:

```javascript
import { LitState, asyncStateVar } from 'lit-element-state';

class MyState extends LitState {

    myData = asyncStateVar(() => this.getData());

    getData() {
        return new Promise((resolve, reject) => {
            // Resolve the promise after 3 seconds with a random number
            setTimeout(() => resolve(Math.random()), 3000);
        });
    }

}

const myState = new MyState();
```

In the template, you can check the status of the promise with the functions
`isPending()`, `isRejected()` and `isFulfilled()` on the `asyncStateVar`. For
example: `myState.myData.isPending()`. Based on the status of the promise you
can then either call `getResult()` or `getError()`. There's also a convenient
function `getValue()` that returns `getResult()` when the promise is fulfilled,
`getError()` when the promise is rejected, or the default value when the
promise is still pending. The default value can optionally be set with the
second argument to the `asyncStateVar()` function (the first argument is the
promise). You can also reload the promise by calling `reload()`.

Here is an example of how the template could handle the `asyncStateVar`:

```javascript
import { LitStateElement } from 'lit-element-state';

class MyElement extends LitStateElement {

    render() {
        if (myState.myData.isPending()) {
            return html`loading data...`;
        } else if (myState.myData.isRejected()) {
            return html`loading data failed with reason: ${myState.myData.getError()}`;
        } else {
            return myState.myData.getResult();
        }
    }

}
```

## FAQ

### Why not use MobX or Redux in the first place? Any benefits by using this?

MobX is quite a large library with a lot of whistles and bells. LitState is
about 300 lines at the moment, and I'm planning on keeping it tiny, just like
LitElement and lit-html.

To use Redux you need a lot of of boiler plate code: *Actions*, *Action
Creators* and *Reducers*. You do have helper libraries that can generate these
things for you, to make it slightly easier, but I still think it is
unnecessarily complicated.

I think MobX is much easier to use, because you don't need to write any
boilerplate. However, MobX is a quite large library, and for more advanced
use-cases it can become relatively complicated to use.

I think a lot of features from MobX are not really necessary when you use
LitElement. MobX is mainly created for React. Therefore MobX has optimizations
aimed at how React works. LitState is specifically aimed at LitElement. And
most of the optimizations MobX created for React are not required for
LitElement.

See the section [How does this work?](#how-does-this-work) to see how LitState
works together with LitElement.

Also LitState doesn't try to track changes inside objects, like MobX does. That
is also a reason why MobX becomes complicated. It's nice that you can modify
objects and MobX detects that, but it's not very hard to just set a new object.
That makes the source code of LitState a lot smaller and simpler, and therefore
also easier to understand what is happening.
[Look here](#only-new-assigns-trigger-a-rerender-updating-a-objectarray-wont-trigger-a-rerender)
for more details on this.

Basically it comes down to the fact that LitState is written for, and with the
same philosophy as, LitElement and lit-html. Which makes it more suitable for
developers that like this philosophy.


## Development

LitState is brand-new. I created it because I wanted an easy way to deal with
shared app state in LitElement, for my own projects. I hope it can make the
lives of other developers easier too.

I want to keep LitState small and simple, just like LitElement. So I don't
expect to add a lot of features. Only things that are a very common patterns
for shared app state management would be suitable to include.

In any case, I will add more documentation and update the demo app to make the
library more accessible. Also I would like to add unit tests, to automatically
test the library. I don't have much experience with unit testing in JavaScript,
so I need to dive into that.

If you have comments, suggestions, questions, any kind of feedback, or you want
to contribute, I would be pleased to hear from you. Feel free to open an issue.
