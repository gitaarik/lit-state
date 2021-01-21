import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
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
                    @click=${this.handleShowCounter1RadioClick}
                    .checked=${demoState.showCounter === 1}
                />
                Show <code>counter1</code>
            </label>

            <label>
                <input
                    type="radio"
                    @click=${this.handleShowCounter2RadioClick}
                    .checked=${demoState.showCounter === 2}
                />
                Show <code>counter2</code>
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

    handleShowCounter1RadioClick() {
        demoState.showCounter = 1;
    }

    handleShowCounter2RadioClick() {
        demoState.showCounter = 2;
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
