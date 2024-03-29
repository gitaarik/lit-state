# LitState Changelog


### 1.7.0 - Non-decorator usage simplified

- The static `stateVars()` getter method should now return an object with in
  the keys the name of the stateVar and in the values the initial value of the
  stateVar.
- The stateVar options were previously set with the static `stateVars()` getter
  method, but should now be specified with the static `stateVarOptions()`
  getter method.
- Docs updated accordingly.
- Added some more descriptive comments in the code.

#### To upgrade from 1.6.x

For non-decorator usage, update the static `stateVar()` getter methods.

Change this:

```javascript
class MyState extends LitState {

    static get stateVars() {
        return {
            myStateVar: { option: 'value' }
        };
    }

    constructor() {
        super();
        this.myStateVar = 'initial value';
    }

}
```

To this:

```javascript
class MyState extends LitState {

    static get stateVars() {
        return {
            myStateVar: 'initial value'
        };
    }

    static get stateVarOptions() {
        return {
            myStateVar: { option: 'value' }
        };
    }

}
```

If the options object is empty, you don't need to specify the static
`stateVarOptions()` getter method.


### 1.6.1 - Support reconnecting components

- When a component gets dynamically removed from the DOM and then added again,
  call `this.requestUpdate()` so that the observers get-readded again. Fixes
  [issue #5](https://github.com/gitaarik/lit-state/issues/5).
- Added a docs page for this use case.
- Reordered docs menu.
- Added some comments in the code.


### 1.6.0 - Added JavaScript decorator support

- The way `stateVar` variables are defined has changed. You have to update this
  coming from 1.5.0.
- Now you can use decorators to specify your stateVars, use `@stateVar() myVar
  = 'initial value';` in your state class.
- You can also still define `stateVar` variables without decorators. It is done
  in a similar way LitElement does. Check the docs for this.
- Updated LitDocs and documentation content.
- Overall refactors.

#### To upgrade from 1.5.x

Update the `stateVar` definitions, instead of:

```javascript
myData = stateVar('value');
```

Do this:

```javascript
@stateVar() myData = 'value';
```

For no-decorator usage, [look in the docs](https://gitaarik.github.io/lit-state/build/#basic-usage/no-decorator-usage/).


### 1.5.0 - Moved `asyncStateVar` to separate repository

- The `asyncStateVar` is now available [here](https://github.com/gitaarik/lit-state-async-state-var)
  so that LitState is tiny for projects that don't use `asyncStateVar`.
- Updated docs and demo app.


### 1.4.0 - Mixin primary means of making components state-aware

- Making mixin usage the primary means for making your components state-aware.
- Renamed the mixin class `LitStateElementMixin` to `observeState`, reads
  nicer, looks better, is shorter.
- Updated docs and demo app to use the new mixin class.


### 1.3.0 - LitState independent from StateVar classes

- `LitState` is now not dependend on the `StateVar` and `AsyncStateVar`
  classes. There's one `BaseStateVar` class which all types of stateVar classes
  should extend from. `LitState` recognizes this as a stateVar, and then
  handles the handling of the `get` and `set` traps to the stateVar. This
  allows for the possibility to factor out `AsyncStateVar` to a separate
  library, making LitState smaller. Because not all apps always need
  `AsyncStateVar`. It also allows for easily adding more (custom) types of
  stateVars, to extend LitState.
- Some more general refactors to make things simpler.
- Reordered some texts in README


### 1.2.3

- Fixed bug where `isRejectedGet()` still returned `true` when a `setValue()`
  failed after it, and `isRejectedSet()` still returned `true` when a
  `getValue()` failed after it.


### 1.2.2

- Updated Readme


### 1.2.1

- Updated Readme


### 1.2.0

- Assigning to an `asyncStateVar` now throws an error, you have to use
  `setValue()`. This to make usage consistent.
- `setValue()` doesn't return a promise anymore.
- `_pendingCache` is always set to `false` when `setValue()` succeeds, so
  `pushCache()` doesn't need `setValue()` to return a promise anymore.
- Removed unnecessary `logStateVar()` calls for `asyncStateVar`. Only
  components that call `getValue()` need to re-render when the var changes.
- Added demo page for components that show different state variables on
  re-renders.
- Overall demo app refactors and UI/text improvements.


### 1.1.2

- Added `setCache(value)` and `pushCache()` functionality to `asyncStateVar`.
- Added demo page for `setCache(value)` and `pushCache()`.
- Updated readme.


### 1.1.1

- Created mixin `LitStateElementMixin`.
- Added demo page for mixin `LitStateElementMixin`.
- Updated demo app internals.


### 1.1.0

- Created changelog.
- Changed behavior of `asyncStateVar()`:
    - You can now have a **getter** and **setter**.
    - `getValue()` won't return the error from the promise's reject callback in
      case of an error anymore. You can get the error with the method
      `getError()` (for the error of the last get or set), `getErrorGet()` (for
      the error of the last get) or `getErrorSet()` (for the error of the last
      set).
- Updated demo app to showcase `asyncStateVar` better.
