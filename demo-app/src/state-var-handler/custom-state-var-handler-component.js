import { customElement, LitElement, html } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('custom-state-var-handler-component')
export class CustomStateVarHandlerComponent extends observeState(DemoComponent(LitElement)) {

    render() {
        return html`
            <h2>&lt;custom-state-var-handler-component&gt;</h2>
            <h3 class="value">
                <button @click=${this.handleDecreaseCounterButtonClick}>-</button>
                ${demoState.counter}
                <button @click=${this.handleIncreaseCounterButtonClick}>+</button>
            </h3>
        `;
    }

    handleDecreaseCounterButtonClick() {
        demoState.counter--;
    }

    handleIncreaseCounterButtonClick() {
        demoState.counter++;
    }

}
