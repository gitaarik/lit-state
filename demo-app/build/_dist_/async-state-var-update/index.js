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

import { customElement, property, html, css } from '../../web_modules/lit-element.js';
import hljs from '../../web_modules/highlightjs/lib/core.js';
import { hljsStyles } from '../hljs-styles.js';
import javascript from '../../web_modules/highlightjs/lib/languages/javascript.js';
import xml from '../../web_modules/highlightjs/lib/languages/xml.js';
import '../../web_modules/highlightjs/styles/github.css.proxy.js';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state.js';
import './async-update-component-1.js';
import './async-update-component-2.js';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
export let AsyncStateVarUpdate = _decorate([customElement('async-state-var-update')], function (_initialize, _LitStateElement) {
  class AsyncStateVarUpdate extends _LitStateElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: AsyncStateVarUpdate,
    d: [{
      kind: "method",
      key: "firstUpdated",
      value: function firstUpdated() {
        _get(_getPrototypeOf(AsyncStateVarUpdate.prototype), "firstUpdated", this).call(this);

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

            <div>

                <h1>LitState <code>asyncStateVar</code> update demo</h1>

                <p>
                    Below you see 2 components. They both use a shared state
                    <code>demoState</code>. The <code>demoState</code> contains
                    a <code>asyncStateVar</code> that
                    <strong>asynchronously</strong> loads data from a fake API.
                    You can see the status of the loading of the data, and the
                    value of the data:
                </p>

                <div id="demoComponents">
                    <async-update-component-1></async-update-component-1>
                    <async-update-component-2></async-update-component-2>
                </div>

                <p>
                    With the buttons you can <strong>reload</strong> and
                    <strong>update</strong> the data, or <strong>simulate an
                    API error</strong>. The update button will also
                    <strong>asynchronously</strong> update the value. Our fake
                    API adds the current time to every response.
                </p>

                <p>
                    The shared state <code>demoState</code> contains a
                    <code>asyncStateVar</code> called <code>data</code>. On it,
                    we define the functions to <strong>get</strong> and
                    <strong>set</strong> the data, and a <strong>default
                    value</strong>:
                </p>

                <p>
                    <code class="fileName">demo-state.js</code>
                    <code class="bigCode">${this.demoStateCode}</code>
                </p>

                <p>
                    The methods <code>_getData()</code> and
                    <code>_setData(value)</code> both return
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">promises</a>.
                    This is what makes them <strong>asynchronous</strong>. When
                    the promises call the <code>resolve()</code> callback, it
                    <strong>sets the value</strong> of the
                    <code>asyncStateVar</code> to the response of the method
                    <code>_fakeApiResponse()</code>.
                </p>

                <p>
                    The components that use the state extend from
                    <code>LitStateElement</code> instead of
                    <code>LitElement</code>. This makes them automatically
                    re-render when a <code>asyncStateVar</code> they use
                    changes. They also show the status of the
                    <code>get</code> or <code>set</code> promises from the
                    <code>asyncStateVar</code>:
                </p>

                <p>
                    <code class="fileName">component-1.js</code>
                    <code class="bigCode">${this.componentCode}</code>
                </p>

                <p>
                    Like this, you can easily synchronize your UI with the
                    state of your asynchronous data on your page. You don't
                    have to create additional state variables yourself to do
                    this. LitState's got your back.
                </p>

            </div>

        `;
      }
    }, {
      kind: "get",
      key: "demoStateCode",
      value: function demoStateCode() {
        return `import { LitState, asyncStateVar } from 'lit-element-state';
import { currentTime } from './utils.js';


class DemoState extends LitState {

    data = asyncStateVar({
        get: () => this._getData(),
        set: value => this._setData(value),
        default: "[default value]"
    });

    _simulateError = false;

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

    _fakeApiResponseText = "Hello world";

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


export const demoState = new DemoState();`;
      }
    }, {
      kind: "get",
      key: "componentCode",
      value: function componentCode() {
        return `import { customElement, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('async-component-1')
export class AsyncComponent1 extends LitStateElement {

    render() {

        return html\`

            <h2>&lt;component-1&gt;</h2>

            <h3>Status: \${this.dataStatus}</h3>
            <h3>Value: \${demoState.data.getValue()}</h3>

            <button
                @click=\${() => demoState.data.reload()}
                ?disabled=\${demoState.data.isPending()}
            >
                reload data
            </button>

            <button
                @click=\${() => demoState.data.setValue('<component-1> updated the data!')}
                ?disabled=\${demoState.data.isPending()}
            >
                update data
            </button>

            <button
                @click=\${() => demoState.simulateErrorReload()}
                ?disabled=\${demoState.data.isPending()}
            >
                reload error
            </button>

            <button
                @click=\${() => demoState.simulateErrorUpdate()}
                ?disabled=\${demoState.data.isPending()}
            >
                update error
            </button>

        \`;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'loading value...';
        } else if (demoState.data.isPendingSet()) {
            return 'updating value...'
        } else if (demoState.data.isRejectedGet()) {
            return 'loading failed with error: "' + demoState.data.getErrorGet() + '"';
        } else if (demoState.data.isRejectedSet()) {
            return 'updating failed with error: "' + demoState.data.getErrorSet() + '"';
        } else if (demoState.data.isFulfilledGet()) {
            return 'value loaded';
        } else if (demoState.data.isFulfilledSet()) {
            return 'value updated';
        } else {
            return 'unknown';
        }
    }

}`;
      }
    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
        return [hljsStyles, css`

                :host {
                    display: block;
                    margin-top: 25px;
                }

                * {
                    box-sizing: border-box;
                }

                h1 {
                    margin: 0;
                    font-size: 25px;
                }

                h2 {
                    margin: 30px 0 0;
                    font-size: 20px;
                }

                h3 {
                    font-size: 18px;
                    color: red;
                }

                a {
                    color: #000;
                }

                code {
                    display: inline-block;
                    padding: 2px;
                    margin: 1px;
                    background: #555;
                    color: white;
                    white-space: pre;
                }

                .fileName {
                    display: block;
                    margin: 0;
                    padding: 7px 10px;
                    background: #555;
                    font-weight: bold;
                }

                .bigCode {
                    display: block;
                    margin: 0;
                    padding: 10px;
                    width: 100%;
                }

                #demoComponents {
                    display: flex;
                    flex-wrap: wrap;
                    margin: -15px 0 0 -15px;
                }

                #demoComponents > * {
                    border: 1px #666 solid;
                    margin: 15px 0 0 15px;
                    max-width: 290px;
                }

            `];
      }
    }]
  };
}, LitStateElement);