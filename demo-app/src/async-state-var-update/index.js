import { customElement, property, html, css } from 'lit-element';
import { DemoElement } from '@app/demo-element';
import '@app/components/code-small';
import '@app/components/code-big';
import './async-update-component-1';
import './async-update-component-2';


@customElement('async-state-var-update')
export class AsyncStateVarUpdate extends DemoElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>asyncStateVar</code-small> update demo</h1>

                <p>
                    The <code-small><a href="#async-state-var">asyncStateVar</a></code-small>
                    can also be used to asynchronously <strong>update</strong>
                    data. This is done by defining 2 promises on the
                    <code-small>asyncStateVar</code-small>: one to
                    <strong>get</strong> the data, and one to
                    <strong>set</strong> the data. When the status of any of
                    the promises changes, it automatically re-renders the
                    components that use the
                    <code-small>asyncStateVar</code-small>:
                </p>

                <div id="demoComponents">
                    <async-update-component-1></async-update-component-1>
                    <async-update-component-2></async-update-component-2>
                </div>

                <p>
                    Like in the previous example, we have a fake API for
                    demonstation purposes. This fake API also simulates
                    updating the value:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    The components use
                    <code-small>demoState.data.setValue(value)</code-small> to
                    initiate the <strong>set</strong> promise. When it resolves
                    or fails, the components will be re-rendered. The components
                    use <code-small>isPendingSet()</code-small>,
                    <code-small>isRejectedSet()</code-small> and
                    <code-small>isFulfilledSet()</code-small> to check the
                    status of the <strong>set</strong> promise. For the
                    <strong>get</strong> promise we use
                    <code-small>isPendingGet()</code-small>,
                    <code-small>isRejectedGet()</code-small> and
                    <code-small>isFulfilledGet()</code-small>:
                </p>

                <p>
                    <code-big filename='component-1.js' .code=${this.componentCode}></code-big>
                </p>

                <p>
                    This makes it easy to deal with asynchronous
                    <strong>gets</strong> and <strong>sets</strong>.
                </p>
                
                <p>
                    In case you want to set the value in the UI before
                    executing the <strong>set</strong> promise, check out
                    <a href="#async-state-var-update-cache">asyncStateVar update with cache</a>.
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
        default: "[default value]" // optional
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
        this.data.setValue(
            "This value won't be set, because our fake API will fail."
        );
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
                @click=\${() => demoState.data.setValue(
                    '<component-1> updated the data!'
                )}
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
            return (
                'loading failed with error: ' +
                '"' + demoState.data.getErrorGet() + '"'
            );
        } else if (demoState.data.isRejectedSet()) {
            return (
                'updating failed with error: ' +
                '"' + demoState.data.getErrorSet() + '"'
            );
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

}
