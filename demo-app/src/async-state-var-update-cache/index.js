import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from '@app/lit-state.js';
import '@app/components/code-small';
import '@app/components/code-big';
import { demoState } from './state';
import './async-update-cache-component-1';
import './async-update-cache-component-2';


@customElement('async-state-var-update-cache')
export class AsyncStateVarUpdateCache extends LitStateElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>asyncStateVar</code-small> update with cache demo</h1>

                <p>
                    Sometimes you want to update your UI before you send the
                    update to your API. For this you can use the
                    <code>setCache(value)</code> method of
                    <code>asyncStateVar</code>. This will re-render your
                    components with the cached value. When you finally want to
                    push the update to your API, you can use
                    <code>pushCache()</code>:
                </p>

                <div id="demoComponents">
                    <async-update-cache-component-1></async-update-cache-component-1>
                    <async-update-cache-component-2></async-update-cache-component-2>
                </div>

                <p>
                    Our <code-small>demoState</code-small> doesn't need extra
                    functionality to support the cached value. We just have our
                    fake API for demonstation purposes:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    In our components, we call
                    <code-small>setCache(value)</code-small> on a
                    <code-small>keyup</code-small> event of the
                    <code-small>&lt;input&gt;</code-small> element. We
                    additionally use the
                    <code-small>isPendingCache()</code-small> method to check
                    whether there is a cache pending to be pushed:
                </p>

                <p>
                    <code-big filename='component-1.js' .code=${this.componentCode}></code-big>
                </p>

                <p>
                    Like this, it's easy to keep your UI synchronized with the
                    asynchronous data in your app.
                </p>

            </div>

        `;

    }

    get demoStateCode() {

        return `import { LitState, asyncStateVar } from 'lit-element-state';


class DemoState extends LitState {

    data = asyncStateVar({
        get: () => this._getData(),
        set: value => this._setData(value),
        default: "[default value]"
    });

    _getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._fakeApiResponse);
            }, 3000);
        });
    }

    _setData(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this._fakeApiResponse = value;
                resolve(this._fakeApiResponse);
            }, 3000);
        });
    }

    _fakeApiResponse = "Hello world";

}


export const demoState = new DemoState();
`;

    }

    get componentCode() {

        return `import { customElement, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('async-update-cache-component-1')
export class AsyncUpdateCacheComponent1 extends LitStateElement {

    render() {

        return html\`

            <h2>&lt;component-1&gt;</h2>
            <h3>Status: \${this.dataStatus}</h3>

            <p>
                <input
                    type="text"
                    .value=\${demoState.data.getValue()}
                    @keyup=\${this.handleInputKeyUp}
                    ?disabled=\${demoState.data.isPending()}
                />
            </p>

            <div id="buttons">

                <button
                    @click=\${() => demoState.data.reload()}
                    ?disabled=\${demoState.data.isPending()}
                >
                    reload data
                </button>

                <button
                    @click=\${() => demoState.data.pushCache()}
                    ?disabled=\${
                        demoState.data.isPending()
                        || !demoState.data.isPendingCache()
                    }
                >
                    push cache
                </button>

            </div>

        \`;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'loading value...';
        } else if (demoState.data.isPendingSet()) {
            return 'updating value...'
        } else if (demoState.data.isPendingCache()) {
            return 'cache pending';
        } else if (demoState.data.isFulfilledGet()) {
            return 'value loaded';
        } else if (demoState.data.isFulfilledSet()) {
            return 'value updated';
        } else {
            return 'unknown';
        }
    }

    handleInputKeyUp(event) {
        demoState.data.setCache(event.target.value);
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
