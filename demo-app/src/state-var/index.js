import { customElement, property, html, css } from 'lit-element';
import { DemoElement } from '@app/demo-element';
import '@app/components/code-small';
import '@app/components/code-big';
import './state-var-component-1';
import './state-var-component-2';


@customElement('state-var')
export class StateVar extends DemoElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>stateVar</code-small> demo</h1>

                <p>
                    Below are 2 components with a shared state
                    <code-small>demoState</code-small>. When you change the
                    state from one component, the other component automatically
                    synchronizes:
                </p>

                <div id="demoComponents">
                    <state-var-component-1></state-var-component-1>
                    <state-var-component-2></state-var-component-2>
                </div>

                <p>
                    The shared state <code-small>demoState</code-small>
                    contains a <code-small>stateVar</code-small> called
                    <code-small>counter</code-small>. It holds an integer that
                    has an initial value of <code-small>0</code-small>:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    The components that use the state use the mixin
                    <code-small>observeState</code-small>. This makes them
                    automatically re-render when a
                    <code-small>stateVar</code-small> they use changes:
                </p>

                <p>
                    <code-big filename='component-1.js' .code=${this.componentCode}></code-big>
                </p>

                <p>
                    That's all. How simple do you want to have it?
                </p>

                <p>
                    LitState also has a convenient way of dealing with
                    asynchronous data. See
                    <code-small><a href="#async-state-var">asyncStateVar</a></code-small>.
                </p>

            </div>

        `;

    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {
    counter = stateVar(0);
}

export const demoState = new DemoState();`;

    }

    get componentCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { demoState } from './demo-state.js';

@customElement('component-1')
export class Component1 extends observeState(LitElement) {

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

}
