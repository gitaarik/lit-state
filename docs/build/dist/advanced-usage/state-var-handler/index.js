function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function () { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function (O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function (F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function (receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function (elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function (element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function (element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function (elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function (element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function (elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function (elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function (elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function (elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function (obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function (constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function (obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { customElement, LitElement, property, html } from '../../../web_modules/lit-element.js';
import { LitDocsContent } from '../../../web_modules/lit-docs.js';
import '../../../web_modules/lit-docs.js';
import './custom-state-var-handler-component.js';
export let StateVarHandler = _decorate([customElement('state-var-handler')], function (_initialize, _LitDocsContent) {
  class StateVarHandler extends _LitDocsContent {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: StateVarHandler,
    d: [{
      kind: "method",
      key: "render",
      value: function render() {
        return html`

            <h1><code>stateVar</code> handler</h1>

            <p>
                You can also define your own <code>stateVar</code> handler
                class. This allows you to have custom functionality when you
                read/write your stateVars. An example of a custom state var is
                <a target="_blank" href="https://github.com/gitaarik/lit-state-async-state-var">asyncStateVar</a>.
                This is a type of stateVar that makes it easy to deal with
                asynchronous data, and the state of the data (loading,
                updating, loaded, updated, etc).
            </p>

            <p>
                On this page we'll make a custom stateVar handler ourselves.
                We'll create a <code>LocalStorageHandler</code> that saves your
                <code>stateVar</code> values to <code>localStorage</code>. So
                that your state is retained when you refresh your page.
            </p>

            <p>
                Here is the component already. Later we'll explain how it is
                made. To try it out, change the value and refresh the page.
            </p>

            <div class="demoComponents">
                <custom-state-var-handler-component></custom-state-var-handler-component>
            </div>

            <h2>Default StateVar handler</h2>

            <p>
                We implement this handler by creating a new class that extends
                from the default handler class
                <code>StateVar</code>. This default handler class
                looks like this:
            </p>

            <p>
                <code-block filename='lit-state.js' .code=${this.litStateStateVarHandlerCode}></code-block>
            </p>

            <h2>Custom StateVar handler</h2>

            <p>
                We will extend this class and add some functionality. You see
                that the constructor of the default handler sets some default
                variables. We will use some of these in our custom handler.
            </p>

            <p>
                <code-block filename='local-storage-handler.js' .code=${this.localStorageHandlerCode}></code-block>
            </p>

            <p>
                Like this, when the <code>stateVar</code> is
                created, the initial value is set to any previously set
                <code>localStorage</code> value, or else to
                <code>options.initialValue</code>. And whenever a
                new value is set, it is saved to
                <code>localStorage</code>. The option
                <code>localStorageKey</code> is used as the key for
                the <code>localStorage</code>.
            </p>

            <h2>Usage in state class</h2>

            <p>
                Now let's see how we use this custom
                <code>stateVar</code> handler in our
                <code>demoState</code> class:
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>
                You see that we tell LitState to use a different handler by
                specifying the <code>handler</code> option. The
                other options are options of our own custom handler. The
                <code>initialValue</code> should be set through an
                option. It can't be set like <code>counter = 0</code>,
                because that would be seen as a regular assignment, and would
                override any previously value in
                <code>localStorage</code>.
            </p>

            <h3>Custom decorator</h3>

            <p>
                If you use your custom <code>stateVar</code>
                handler a lot, it could be useful to also make a custom
                decorator function:
            </p>

            <p>
                <code-block .code=${this.localStorageHandlerDecoratorCode}></code-block>
            </p>

            <p>
                This allows you to define the <code>stateVar</code>
                like this:
            </p>

            <p>
                <code-block .code=${this.customDecoratorCode}></code-block>
            </p>

            <p>
                Custom <code>stateVar</code> handlers give you a
                lot of power for customizing what happens when your
                <code>stateVar</code> variables are being get/set.
            </p>

            <h3>No-decorator usage</h3>

            <p>Without decorators, you could implement it like this:</p>

            <p>
                <code-block .code=${this.customStatevarNoDecoratorUsageCode}></code-block>
            </p>

            <h3>Providing options from a method</h3>

            <p>
                To give you access to the <code>this</code> objects on your
                state instance, you can additionally add options to your
                handler through a method.
            </p>

            <p>
                <code-block .code=${this.methodDecoratingCode}></code-block>
            </p>

        `;
      }
    }, {
      kind: "get",
      key: "litStateStateVarHandlerCode",
      value: function litStateStateVarHandlerCode() {
        return `// ...
        
export class StateVar {

    constructor(args) {
        this.options = args.options; // The options given in the \`stateVar\` declaration
        this.recordRead = args.recordRead; // Callback to indicate the \`stateVar\` is read
        this.notifyChange = args.notifyChange; // Callback to indicate the \`stateVar\` value has changed
        this.value = undefined; // The initial value
    }

    // Called when the \`stateVar\` on the \`State\` class is read.
    get() {
        this.recordRead();
        return this.value;
    }

    // Returns whether the given \`value\` should be passed on to the \`set()\`
    // method. Can be used for validation and/or optimization.
    shouldSetValue(value) {
        return this.value !== value;
    }

    // Called when the \`stateVar\` on the \`State\` class is set.
    set(value) {
        this.value = value;
        this.notifyChange()
    }

}

// ...`;
      }
    }, {
      kind: "get",
      key: "localStorageHandlerCode",
      value: function localStorageHandlerCode() {
        return `import { StateVar } from 'lit-element-state';
        
export class LocalStorageHandler extends StateVar {

    constructor(args) {
        super(args);
        this.value = (
            localStorage.getItem(this.options.localStorageKey)
            || this.options.initialValue
        );
    }

    set(value) {
        super.set(value);
        localStorage.setItem(this.options.localStorageKey, value);
    }

}`;
      }
    }, {
      kind: "get",
      key: "demoStateCode",
      value: function demoStateCode() {
        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {

    @stateVar({
        handler: LocalStorageHandler,
        localStorageKey: 'counter',
        initialValue: 0
    })
    counter;

}`;
      }
    }, {
      kind: "get",
      key: "localStorageHandlerDecoratorCode",
      value: function localStorageHandlerDecoratorCode() {
        return `function localStorageStateVar(options) {
    return stateVar(Object.assign(
        {handler: LocalStorageHandler},
        options
    ));
}`;
      }
    }, {
      kind: "get",
      key: "customDecoratorCode",
      value: function customDecoratorCode() {
        return `class DemoState extends LitState {

    @localStorageStateVar({
        localStorageKey: 'counter',
        initialValue: 0
    })
    counter;

}`;
      }
    }, {
      kind: "get",
      key: "customStatevarNoDecoratorUsageCode",
      value: function customStatevarNoDecoratorUsageCode() {
        return `function localStorageStateVar(options) {
    return Object.assign({
        {handler: LocalStorageHandler},
        options
    });
}

class DemoState extends LitState {

    static get stateVars() {
        return {
            myVar: localStorageStateVar({
                localStorageKey: 'counter',
                initialValue: 0
            })
        }
    }

}`;
      }
    }, {
      kind: "get",
      key: "methodDecoratingCode",
      value: function methodDecoratingCode() {
        return `class DemoState extends LitState {

    @stateVar({ handler: MyCustomHandler })
    myVar() {
        // This object returned, will be added to the \`options\` that are
        // given to the constructor of the \`handler\` class.
        return {
            callback: () => this.callback();
        };
    }

}`;
      }
    }]
  };
}, LitDocsContent(LitElement));