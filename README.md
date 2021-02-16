# LitState

### Simple shared app state management for LitElement.

LitState automatically re-renders your LitElement components, when a shared app
state variable they use changes. It's like LitElement's properties, but then
shared over multiple components.

It's tiny, simple but still powerful, just like
[LitElement](https://lit-element.polymer-project.org/) and
[lit-html](https://lit-html.polymer-project.org/).


## Installation

```
npm install lit-element-state
```

*The name `lit-state` is unfortunately already taken on npm, so therefore the
slightly awkward package name.*


### Current version: v1.6.0

For more information and update instructions, [See the changelog](CHANGELOG.md).


## Basic idea

You keep your shared state in a `LitState` derived class. This class contains
`stateVar` variables that contain the state. This class can also contain helper
functions that modify the state. Decorate your `LitElement` classes with the
`observeState()` mixin. This makes your components automatically re-render
whenever a `stateVar` they use changes.


## Usage

### 1. Create a `LitState` object:

```javascript
import { LitState, stateVar } from 'lit-element-state';

class MyState extends LitState {
    @stateVar() counter = 0;
}

export const myState = new MyState();
```

*For usage without [decorators](https://github.com/tc39/proposal-decorators), see the
[docs](https://gitaarik.github.io/lit-state/build/#basic-usage/no-decorator-usage/).*

### 2. Make your component aware of your state:

By using the `observeState()` mixin on your `LitElement` class and then just
using the `stateVar` variables in your render method:

```javascript
import { LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { myState } form './my-state.js';

class MyComponent extends observeState(LitElement) {

    render() {
        return html`
            <h1>Counter: ${myState.counter}</h1>
            <button @click=${() => myState.counter++}></button>
        `;
    }

}
```

The components that read `myState.counter` will automatically re-render when
any (other) component updates it.

In more technical words:

A component using the `observeState()` mixin will re-render when any
`stateVar` - which it read in the last render cycle - changes.


## Docs

For more information about how to use LitState, check the
[docs](https://gitaarik.github.io/lit-state/build/).


## How does this work?


### Basics

When you define a `stateVar` variable, LitState will observe those variables
whenever they're get or set. When using the `observeState()` mixin on a
component, during the render of that component, there is a recorder active that
records any `stateVar` that is accessed during the render of that component. At
the end of the render, the recorded `stateVar` variables are collected and
whenever one of them changes, the component will be re-rendered. If the
re-render uses different `stateVar` variables, they are again recorded and
observed for possible rerenders.


### Implementation details

To re-render the component, the `observeState()` mixin calls LitElement's
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


## Notes

### You can create and use multiple `LitState` classes at the same time.

It is even encouraged to keep things separate. You can of course have one big
`LitState` derived class which contains all global app state variables. But it
is probably cleaner if you categorize it into multiple smaller `LitState`
derived classes. For example, you can put each state class in a separate file,
collected in a `state/` folder, and import them at the places you need.

### Only new assigns trigger a re-render. Updating a object/array won't trigger a re-render.

Just like LitElement's
[properties](https://lit-element.polymer-project.org/guide/properties),
only a new assign of the `stateVar` triggers a re-render. Doing something like
this won't:

```javascript
MyState extends LitState {
    @stateVar() myObj = {myKey: 'myValue'};
    @stateVar() myArray = ['one', 'two', 'three'];
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


## Extra features

### Custom `stateVar` variables

You can easily extend LitState with a custom `stateVar` handler. An example of
this is the [asyncStateVar](https://github.com/gitaarik/lit-state-async-state-var),
which is a `stateVar` variation that makes handling with asynchronous data
easy. To make a custom `stateVar` yourself, create a class that extends from
`StateVar`, exported by LitState.
[Check out the documentation on this.](https://gitaarik.github.io/lit-state/build/#advanced-usage/state-var-handler/)


## FAQ


### Why should I use shared state for my components? Doesn't that oppose the concept of web components?

The big feature of web components is that they are encapsulated through the
[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
That means that their internal state isn't affected by state from the outside.
And also that the component's internal state doesn't affect other elements on
the page. This makes web components great for creating reusable elements.
Reusable elements should have no side-effects, meaning that they shouldn't
change state outside of themselves.

Reusable elements are great and we should use them a lot. When you're building
a full application however, it is also desirable to have application-specific
components that have application-specific side-effects. For example, changing
the global app state. And it is of course desirable, that when this global app
state changes, the components that use this global app state are synchronized
with it.

And you can also have a reusable component that has several internal
sub-components. They all might need to share some common internal state.

LitState is created for these use cases, and is meant to make it as simple as
possible for the developer.

### Why not use Redux or MobX? Any benefits by using this?

To use [Redux](https://github.com/reduxjs/redux) (or something similar, like
[unistore](https://github.com/developit/unistore)) you need a lot of of boiler
plate code: *Actions*, *Action Creators* and *Reducers*, you need to dispatch
created actions and you need to map the state to your props inside your
components. You have helper libraries that make it a bit easier, but I still
think it is unnecessarily complicated.

I think [MobX](https://github.com/mobxjs/mobx) is much easier to use, because
you don't need to write any boilerplate. However, MobX is a quite large library
with a lot of whistles and bells. And for more advanced use-cases it can become
relatively complicated to use.

I think a lot of features from MobX are not really necessary when you use
LitElement. MobX is mainly created for React. Therefore MobX has optimizations
aimed at how React works. LitState is specifically aimed at LitElement. And
most of the optimizations MobX created for React are not required for
LitElement.

See the section [How does this work?](#how-does-this-work) to see how LitState
works together with LitElement.

Also LitState doesn't try to track changes inside objects, like MobX does. That
is also a reason why MobX is complicated. It's nice that you can modify objects
and MobX detects that, but it's not very hard to just set a new object. That
makes the source code of LitState a lot smaller and simpler, and therefore also
easier to understand what is happening.
[Look here](#only-new-assigns-trigger-a-re-render-updating-a-objectarray-wont-trigger-a-re-render)
for more details on this.

Basically it comes down to the fact that LitState is written for, and with the
same philosophy as, LitElement and lit-html. Which makes it more suitable for
developers that like this philosophy.

If you however do want to use MobX with LitElement for some reason, check out
[lit-mobx](https://github.com/adobe/lit-mobx).


## Development

LitState is brand-new. I created it because I wanted an easy way to deal with
shared app state in LitElement, for my own projects. I hope it can make the
lives of other developers easier too.

I want to keep LitState small and simple, just like LitElement. So I don't
expect to add a lot of features. Only things that are a very common patterns
for shared app state management would be suitable to include.

In any case, I will keep expanding the documentation to make the library more
accessible. Also I would like to add unit tests, to automatically test the
library. I don't have much experience with unit testing in JavaScript, so I
need to dive into that.

If you have comments, suggestions, questions, any kind of feedback, or you want
to contribute, I would be pleased to hear from you. Feel free to open an issue.


## Also see

- [asyncStateVar](https://github.com/gitaarik/lit-state-async-state-var) - asyncStateVar for LitState, easy handing of async data 
- [LitStyle](https://github.com/gitaarik/lit-style) - Shared component styles for LitElement 
- [LitDocumentEvent](https://github.com/gitaarik/lit-document-event) - Easily add listeners to the document object
- [LitDocs](https://github.com/gitaarik/lit-docs) - Utilities to create documentation for LitElement related projects
