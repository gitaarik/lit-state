import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './state-var-component-1';
import './state-var-component-2';


@customElement('basic-usage')
export class BasicUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>LitState demo</h1>

            <p>
                Below are 2 components with a shared state
                <code>demoState</code>. When you change the state
                from one component, the other component automatically
                synchronizes:
            </p>

            <div class="demoComponents">
                <state-var-component-1></state-var-component-1>
                <state-var-component-2></state-var-component-2>
            </div>

            <p>
                The shared state <code>demoState</code> contains a
                <code>stateVar</code> called
                <code>counter</code>. It holds an integer that has
                an initial value of <code>0</code>:
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>
                The components that use the state use the mixin
                <code>observeState</code>. This makes them
                automatically re-render when a
                <code>stateVar</code> they use changes:
            </p>

            <p>
                <code-block filename='component-1.js' .code=${this.componentCode}></code-block>
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
            <button @click=\${this.handleIncreaseCounterButtonClick}>
                increase counter
            </button>
        \`;
    }

    handleIncreaseCounterButtonClick() {
        demoState.counter++;
    }

}`;

    }

}
