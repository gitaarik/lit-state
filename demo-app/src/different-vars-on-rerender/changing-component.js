import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state.js';


@customElement('changing-component')
export class ChangingComponent extends observeState(DemoComponent(LitElement)) {

    render() {

        return html`

            <h2>&lt;changing-component&gt;</h2>

            <label>
                <input
                    type="radio"
                    @click=${() => demoState.showCounter = 1}
                    .checked=${demoState.showCounter === 1}
                />
                Show <code-small>counter1</code-small>
            </label>

            <label>
                <input
                    type="radio"
                    @click=${() => demoState.showCounter = 2}
                    .checked=${demoState.showCounter === 2}
                />
                Show <code-small>counter2</code-small>
            </label>

            <h3 class="value">Value: ${this.counter}</h3>

        `;

    }

    get counter() {
        if (demoState.showCounter === 1) {
            return demoState.counter1;
        } else if (demoState.showCounter === 2) {
            return demoState.counter2;
        }
    }

    static get styles() {

        return css`

            label {
                display: block;
                margin: 5px 0;
                padding: 5px;
                background: #BBB;
                border-radius: 5px;
                cursor: pointer;
            }

            label input {
                margin: 0 5px 0;
            }

        `;

    }

}
