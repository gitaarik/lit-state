import { customElement, LitElement, html } from 'lit-element';
import '@app/demo-component.js';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('computed-value-component')
export class ComputedValueComponent extends observeState(demoComponentStyle(LitElement)) {

    render() {

        return html`

            <showcase-box>

                <h2>&lt;computed-value-component&gt;</h2>

                <h3 class="value">
                    Number 1:
                    <input
                        type="number"
                        .value=${demoState.number1}
                        @change=${this.handleNumber1InputChange}
                    ></input>
                </h3>

                <h3 class="value">
                    Number 2:
                    <input
                        type="number"
                        .value=${demoState.number2}
                        @change=${this.handleNumber2InputChange}
                    ></input>
                </h3>

                <h3>
                    <button @click=${this.handleIncreaseBothButtonClick}>Increase both</button>
                </h3>

                <h3 class="value">Sum: ${demoState.sum}</h3>

            </showcase-box>

        `;

    }

    handleNumber1InputChange(event) {
        demoState.number1 = parseInt(event.target.value);
    }

    handleNumber2InputChange(event) {
        demoState.number2 = parseInt(event.target.value);
    }

    handleIncreaseBothButtonClick() {
        demoState.increaseBoth();
    }

}
