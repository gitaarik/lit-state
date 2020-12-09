import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from '../lit-state.js';
import '@app/components/code-small';
import '@app/components/code-big';
import { demoState } from './state';
import './state-var-component-1';
import './state-var-component-2';


@customElement('state-var')
export class StateVar extends LitStateElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>stateVar</code-small> demo</h1>

                <p>
                    Below you see 2 components. They both use a shared state
                    <code-small>demoState</code-small>. When you change the state from one
                    component, the other component automatically synchronizes:
                </p>

                <div id="demoComponents">
                    <state-var-component-1></state-var-component-1>
                    <state-var-component-2></state-var-component-2>
                </div>

                <p>
                    The shared state <code-small>demoState</code-small> contains a
                    <code-small>stateVar</code-small> called <code-small>counter</code-small>. It holds an
                    integer that has an initial value of <code-small>0</code-small>:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    The components that use the state extend from
                    <code-small>LitStateElement</code-small> instead of
                    <code-small>LitElement</code-small>. This makes them automatically
                    re-render when a <code-small>stateVar</code-small> they use changes:
                </p>

                <p>
                    <code-big filename='component-1.js' .code=${this.componentCode}></code-big>
                </p>

                <p>
                    That's all. How simple do you want to have it?
                </p>

                <p>
                    LitState also has a convenient way of dealing with
                    asynchronous data. See <a href="#async-state-var">asyncStateVar</a>.
                </p>

            </div>

        `;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'getting value...';
        } else if (demoState.data.isPendingSet()) {
            return 'setting value...'
        } else {
            return 'done';
        }
    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {
    counter = stateVar(0);
}

export const demoState = new DemoState();`;

    }

    get componentCode() {

        return `import { customElement, html } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state.js';

@customElement('component-1')
export class Component1 extends LitStateElement {

    render() {
        return html\`
            <h2>&lt;component-1&gt;</h2>
            <h3>Counter: \${demoState.counter}</h3>
            <button @click=\${() => demoState.counter++}>
                increase counter
            </button>
        \`;
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
            }

        `;

    }

}
