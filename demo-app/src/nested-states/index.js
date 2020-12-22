import { customElement, LitElement, property, html, css } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';
import 'lit-element-demo-app-helpers';
import './nested-state-component.js';


@customElement('nested-states')
export class NestedStates extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Nested States</h1>

            <p>
                You can also easily nest states.
                <code-small>stateVar</code-small> variables can contain
                instances of other states. They will be recognized by LitState
                just the same.
            </p>

            <h2>Example:</h3>

            <p>
                <code-big filename='states.js' .code=${this.statesSourceCode}></code-big>
            </p>

            <p>
                <code-big filename='nested-state-component.js' .code=${this.nestedStateComponentSourceCode}></code-big>
            </p>

            <h2>Output:</h3>

            <p>
                <nested-state-component></nested-state-component>
            </p>

        `;

    }

    get statesSourceCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class ParentState extends LitState {
    childState1 = stateVar();
    childState2 = stateVar();
}

class ChildState extends LitState {
    counter = stateVar(0);
}

export const parentState = new ParentState();
const childState1 = new ChildState();
const childState2 = new ChildState();

childState1.counter = 1;
childState2.counter = 1000;

parentState.childState1 = childState1;
parentState.childState2 = childState2;`;

    }

    get nestedStateComponentSourceCode() {

        return `import { customElement, LitElement, html, css } from 'lit-element';
import { observeState } from 'lit-element-state';
import { parentState } from './states.js';

@customElement('nested-state-component')
export class NestedStateComponent extends observeState(LitElement) {

    render() {

        return html\`

            <h2>&lt;nested-state-component&gt;</h2>

            <h3 class="value">ChildState1 counter: \${parentState.childState1.counter}</h3>
            <button @click=\${() => parentState.childState1.counter++}>increase counter</button>

            <h3 class="value">ChildState2 counter: \${parentState.childState2.counter}</h3>
            <button @click=\${() => parentState.childState2.counter++}>increase counter</button>

        \`;

    }

}`;

    }

}
