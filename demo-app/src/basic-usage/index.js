import { customElement, LitElement, property, html, css } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';
import 'lit-element-demo-app-helpers';
import './state-var-component-1';
import './state-var-component-2';


@customElement('basic-usage')
export class BasicUsage extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>LitState demo</h1>

            <p>
                Below are 2 components with a shared state
                <code-small>demoState</code-small>. When you change the state
                from one component, the other component automatically
                synchronizes:
            </p>

            <div class="demoComponents">
                <state-var-component-1></state-var-component-1>
                <state-var-component-2></state-var-component-2>
            </div>

            <p>
                The shared state <code-small>demoState</code-small> contains a
                <code-small>stateVar</code-small> called
                <code-small>counter</code-small>. It holds an integer that has
                an initial value of <code-small>0</code-small>:
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

        `;

    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {
    @stateVar() counter = 0;
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
