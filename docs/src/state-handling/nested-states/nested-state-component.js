import { customElement, LitElement, html } from 'lit-element';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { parentState } from './states.js';
import 'lit-docs';


@customElement('nested-state-component')
export class NestedStateComponent extends observeState(demoComponentStyle(LitElement)) {

    render() {

        return html`

            <showcase-box>

                <h2>&lt;nested-state-component&gt;</h2>

                <h3 class="value">ChildState1 counter: ${parentState.childState1.counter}</h3>
                <button @click=${this.handleIncreaseChild1CounterButtonClick}>increase counter</button>

                <h3 class="value">ChildState2 counter: ${parentState.childState2.counter}</h3>
                <button @click=${this.handleIncreaseChild2CounterButtonClick}>increase counter</button>

            </showcase-box>

        `;

    }

    handleIncreaseChild1CounterButtonClick() {
        parentState.childState1.counter++;
    }

    handleIncreaseChild2CounterButtonClick() {
        parentState.childState2.counter++;
    }

}
