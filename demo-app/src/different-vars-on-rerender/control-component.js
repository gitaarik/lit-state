import { customElement, LitElement, html } from 'lit-element';
import '@app/demo-component.js';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('control-component')
export class ControlComponent extends observeState(demoComponentStyle(LitElement)) {

    render() {

        return html`

            <showcase-box>

                <h2>&lt;control-component&gt;</h2>

                <h3 class="value">
                    Counter1:
                    ${demoState.counter1}
                    <button @click=${this.handleIncreaseCounter1ButtonClick}>increase</button>
                </h3>

                <h3 class="value">
                    Counter2:
                    ${demoState.counter2}
                    <button @click=${this.handleIncreaseCounter2ButtonClick}>increase</button>
                </h3>

            </showcase-box>

        `;

    }

    handleIncreaseCounter1ButtonClick() {
        demoState.counter1++;
    }

    handleIncreaseCounter2ButtonClick() {
        demoState.counter2++;
    }

}
