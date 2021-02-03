import { customElement, LitElement, html } from 'lit-element';
import '@app/demo-component.js';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('custom-state-var-handler-component')
export class CustomStateVarHandlerComponent extends observeState(demoComponentStyle(LitElement)) {

    render() {

        return html`

            <showcase-box>

                <h2>&lt;custom-state-var-handler-component&gt;</h2>
                <h3 class="value">
                    <button @click=${this.handleDecreaseCounterButtonClick}>-</button>
                    ${demoState.counter}
                    <button @click=${this.handleIncreaseCounterButtonClick}>+</button>
                </h3>

            </showcase-box>

        `;

    }

    handleDecreaseCounterButtonClick() {
        demoState.counter--;
    }

    handleIncreaseCounterButtonClick() {
        demoState.counter++;
    }

}
