import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from '@app/lit-state.js';
import '@app/components/code-small';
import '@app/components/code-big';
import { demoState } from './state';
import './async-component-1';
import './async-component-2';


@customElement('async-state-var')
export class AsyncStateVar extends LitStateElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>asyncStateVar</code-small> demo</h1>

                <p>
                    Below you see 2 components. They both use a shared state
                    <code-small>demoState</code-small>. The <code-small>demoState</code-small> contains
                    a <code-small>asyncStateVar</code-small> that
                    <strong>asynchronously</strong> loads data from a fake API.
                    You can see the status of the loading of the data, and the
                    value of the data:
                </p>

                <div id="demoComponents">
                    <async-component-1></async-component-1>
                    <async-component-2></async-component-2>
                </div>

                <p>
                    With the buttons, you can <strong>reload</strong> the data,
                    or <strong>simulate an API error</strong>. Our fake API
                    adds the current time to every response.
                </p>

                <p>
                    The shared state <code-small>demoState</code-small> contains a
                    <code-small>asyncStateVar</code-small> called <code-small>data</code-small>. On it,
                    we define the function to <strong>get</strong> the data:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    The methods <code>_getData()</code> returns a
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">JavaScript Promise</a>.
                    This is what makes it <strong>asynchronous</strong>. When
                    the promise calls the <code>resolve()</code> callback, it
                    <strong>sets the value</strong> of the
                    <code>asyncStateVar</code> to the response of the method
                    <code>_fakeApiResponse()</code>.
                </p>

                <p>
                    The components that use the state extend from
                    <code>LitStateElement</code> instead of
                    <code>LitElement</code>. This makes them automatically
                    re-render when a <code>asyncStateVar</code> they use
                    changes. They also show the status of the promises from the
                    <code>asyncStateVar</code>:
                </p>

                <p>
                    <code-big filename='component-1.js' .code=${this.componentCode}></code-big>
                </p>

                <p>
                    Like this, you can easily synchronize your UI with the
                    state of your asynchronous data on your page. You don't
                    have to create additional state variables yourself to do
                    this. LitState's got your back.
                </p>

                <p>
                    <code-small>asyncStateVar</code-small> can also handle updates. See
                    <a href="#async-state-var-update">asyncStateVar update</a>.
                </p>

            </div>

        `;

    }

    get demoStateCode() {

        return `import { LitState, asyncStateVar } from 'lit-element-state';
import { currentTime } from './utils.js';


class DemoState extends LitState {

    data = asyncStateVar(() => this._getData());

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

    _fakeApiResponseText = "Hello world";

    _fakeApiResponse() {
        return this._fakeApiResponseText + " (" + currentTime() + ")";
    }

    simulateError() {
        this._simulateError = true;
        this.data.reload();
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
                @click=\${() => demoState.simulateError()}
                ?disabled=\${demoState.data.isPending()}
            >
                simulate error
            </button>

        \`;

    }

    get dataStatus() {
        if (demoState.data.isPending()) {
            return 'loading value...';
        } else if (demoState.data.isRejected()) {
            return 'loading failed with error: "' + demoState.data.getError() + '"';
        } else if (demoState.data.isFulfilled()) {
            return 'value loaded';
        } else {
            return 'unknown';
        }
    }

}`;

    }

    static get styles() {

        return css`

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

        `;

    }

}
