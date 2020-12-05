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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { customElement, property, html, css } from '../web_modules/lit-element.js';
import { LitStateElement } from './lit-state.js';
import hljs from '../web_modules/highlightjs/lib/core.js';
import javascript from '../web_modules/highlightjs/lib/languages/javascript.js';
import xml from '../web_modules/highlightjs/lib/languages/xml.js';
import '../web_modules/highlightjs/styles/github.css.proxy.js';
import { demoState } from './demo-state.js';
import './sub-component-1.js';
import './sub-component-2.js';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
export let LitStateDemo = _decorate([customElement('lit-state-demo')], function (_initialize, _LitStateElement) {
  class LitStateDemo extends _LitStateElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: LitStateDemo,
    d: [{
      kind: "method",
      key: "firstUpdated",
      value: function firstUpdated() {
        _get(_getPrototypeOf(LitStateDemo.prototype), "firstUpdated", this).call(this);

        this.initHighlightJs();
      }
    }, {
      kind: "method",
      key: "initHighlightJs",
      value: function initHighlightJs() {
        this.shadowRoot.querySelectorAll('.bigCode').forEach(block => {
          hljs.highlightBlock(block);
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return html`
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/default.min.css"></link>

            <h1>&lt;lit-state-demo&gt;</h1>

            <p>
                This page consists of 3 components:
                <code>&lt;lit-state-demo&gt;</code>,
                <code>&lt;sub-component-1&gt;</code> and
                <code>&lt;sub-component-2&gt;</code>. They all use a shared
                state <code>demoState</code>. When you change the state in one
                component, the other components automatically synchronize.
            </p>

            <div id="items">

                <div>
                    <h3>Counter: ${demoState.counter}</h3>
                    <button @click=${() => demoState.increaseCounter()}>increase counter</button>
                </div>

                <div id="asyncData">

                    <h3>Async Data: ${demoState.data.getValue()}</h3>

                    <button @click=${() => demoState.data.reload()} ?disabled=${demoState.data.isPending()}>
                        reload data
                    </button>

                </div>

            </div>

            <sub-component-1></sub-component-1>
            <sub-component-2></sub-component-2>

            <h2>Explanation</h2>

            <p>
                On the left side you see a simple <code>stateVar</code> called
                <code>counter</code>. It holds an integer that has an initial
                value of <code>0</code>. The button increases the value by
                <code>1</code>. The value can be simply read with
                <code>demoState.counter</code> and set by
                <code>demoState.counter = 5;</code> for example. When it is set,
                the components that use the <code>stateVar</code> automatically
                re-render to show the new value.
            </p>

            <p>
                On the right side you see an <code>asyncStateVar</code> called
                <code>data</code>. An <code>asyncStateVar</code> is a special
                variable that contains a promise. The promise is automatically
                executed when the variable is being used. You can check the
                status of the promise with the functions
                <code>isPending()</code>, <code>isRejected()</code> and
                <code>isFulfilled()</code> on <code>demoState.data</code>.
                Based on the status of the promise you can then either call
                <code>getResult()</code> or <code>getError()</code>. There's
                also a convenient function <code>getValue()</code> that returns
                <code>getResult()</code> when the promise is fulfilled,
                <code>getError()</code> when the promise is rejected, or the
                default value when the promise is still pending. The default
                value can optionally be set with the second argument to the
                <code>asyncStateVar()</code> function (the first argument is
                the promise). You can also reload the promise by calling
                <code>reload()</code>. The explanation will be clarified by
                looking at the source code below.
            </p>

            <p>
                The <code>demoState</code> code looks like this:
            </p>

            <p>
                <code class="bigCode">${this.demoStateCode}</code>
            </p>

            <p>
                The components that use the state simply do
                <code>import { demoState } from './demo-state.js</code> and
                then use <code>demoState.counter</code> (the
                <code>stateVar</code>) and
                <code>demoState.data.getValue()</code> (the
                <code>asyncStateVar</code>) in the template to get the values
                from the state.
            </p>

            <p>
                As an illustration, the <code>render()</code> method of
                <code>&lt;sub-component-1&gt;</code> looks like this:
            </p>

            <p>
                <code class="bigCode">${this.component1Code}</code>
            </p>

        `;
      }
    }, {
      kind: "get",
      key: "demoStateCode",
      value: function demoStateCode() {
        return `import { LitState, stateVar, asyncStateVar } from 'lit-element-state';


class DemoState extends LitState {

    counter = stateVar(0);
    data = asyncStateVar(() => this.getData(), 'loading...');

    increaseCounter() {
        this.counter++;
    }

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Math.random().toString().substr(2));
            }, 3000);
        });
    }

}


export const demoState = new DemoState();`;
      }
    }, {
      kind: "get",
      key: "component1Code",
      value: function component1Code() {
        return `<h2>&lt;sub-component-1&gt;</h2>

<div id="items">

    <div>
        <h3>Counter: \${demoState.counter}</h3>
        <button @click=\${() => demoState.increaseCounter()}>increase counter</button>
    </div>

    <div>

        <h3>Async Data: \${demoState.data.getValue()}</h3>

        <button @click=\${() => demoState.data.reload()} ?disabled=\${demoState.data.isPending()}>
            reload data
        </button>

    </div>

</div>`;
      }
    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
        return css`

            :host {
                display: block;
                margin: 15px 0;
                padding: 15px;
                background: lightgrey;
                max-width: 720px;
            }

            * {
                box-sizing: border-box;
            }

            h1 {
                margin: 0;
                font-size: 25px;
                color: palegreen;
            }

            h2 {
                margin: 30px 0 0;
                font-size: 20px;
            }

            h3 {
                font-size: 18px;
                color: red;
            }

            code {
                display: inline-block;
                padding: 2px;
                margin: 1px;
                background: #666;
                color: white;
                white-space: pre;
            }

            .bigCode {
                padding: 10px;
                width: 100%;
            }

            #items {
                display: flex;
                justify-content: space-between;
            }

            #asyncData {
                text-align: right;
            }

        `;
      }
    }]
  };
}, LitStateElement);