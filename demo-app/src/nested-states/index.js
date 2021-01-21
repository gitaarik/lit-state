import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './nested-state-component.js';


@customElement('nested-states')
export class NestedStates extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Nested States</h1>

            <p>
                You can also easily nest states.
                <code>stateVar</code> variables can contain
                instances of other states. They will be recognized by LitState
                just the same.
            </p>

            <h2>Example:</h3>

            <p>
                <code-block filename='states.js' .code=${this.statesSourceCode}></code-block>
            </p>

            <p>
                <code-block filename='nested-state-component.js' .code=${this.nestedStateComponentSourceCode}></code-block>
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
    @stateVar() childState1;
    @stateVar() childState2;
}

class ChildState extends LitState {
    @stateVar() counter;
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
            <button @click=\${this.handleIncreaseChild1CounterButtonClick}>increase counter</button>

            <h3 class="value">ChildState2 counter: \${parentState.childState2.counter}</h3>
            <button @click=\${this.handleIncreaseChild2CounterButtonClick}>increase counter</button>

        \`;

    }

    handleIncreaseChild1CounterButtonClick() {
        parentState.childState1.counter++;
    }

    handleIncreaseChild2CounterButtonClick() {
        parentState.childState2.counter++;
    }

}`;

    }

}
