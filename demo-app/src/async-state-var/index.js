import { customElement, property, html, css } from 'lit-element';
import hljs from 'highlight.js/lib/core';
import { hljsStyles } from '../hljs-styles.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';
import './async-component-1';
import './async-component-2';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


@customElement('async-state-var')
export class AsyncStateVar extends LitStateElement {

    firstUpdated() {
        super.firstUpdated();
        this.initHighlightJs();
    }

    initHighlightJs() {
        this.shadowRoot.querySelectorAll('.bigCode').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    render() {

        return html`

            <div>

                <h1>LitState <code>asyncStateVar</code> demo</h1>

                <p>
                    Below you see 2 components. They both use a shared state
                    <code>demoState</code>. The <code>demoState</code> contains
                    a <code>asyncStateVar</code> that
                    <strong>asynchronously</strong> loads data from a fake API.
                    You can see the status of the loading of the data, and the
                    value of the data:
                </p>

                <div id="demoComponents">
                    <async-component-1></async-component-1>
                    <async-component-2></async-component-2>
                </div>

                <p>
                    You can also <strong>reload</strong> and
                    <strong>update</strong> the data, or <strong>simulate an
                    API error</strong> with the buttons. The update button will
                    also <strong>asynchronously</strong> update the value. Our
                    fake API adds the current time to every response.
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

    get demoStateCode() {

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

    get componentCode() {

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

    static get styles() {

        return [
            hljsStyles,
            css`

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

            `
        ];

    }

}
