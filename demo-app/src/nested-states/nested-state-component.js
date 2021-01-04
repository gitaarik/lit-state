import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { parentState } from './states.js';


@customElement('nested-state-component')
export class NestedStateComponent extends observeState(DemoComponent(LitElement)) {

    render() {

        return html`

            <h2>&lt;nested-state-component&gt;</h2>

            <h3 class="value">ChildState1 counter: ${parentState.childState1.counter}</h3>
            <button @click=${this.handleIncreaseChild1CounterButtonClick}>increase counter</button>

            <h3 class="value">ChildState2 counter: ${parentState.childState2.counter}</h3>
            <button @click=${this.handleIncreaseChild2CounterButtonClick}>increase counter</button>

        `;

    }

    handleIncreaseChild1CounterButtonClick() {
        parentState.childState1.counter++;
    }

    handleIncreaseChild2CounterButtonClick() {
        parentState.childState2.counter++;
    }

}
