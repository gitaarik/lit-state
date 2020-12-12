import { customElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import '@app/components/code-small';
import { demoState } from './state';


@customElement('changing-component')
export class ChangingComponent extends DemoComponent {

    render() {

        const [counter, data] = this.getVars();

        return html`

            <h2>&lt;changing-component&gt;</h2>

            <div id="varsChooser">

                <div>Show vars:</div>

                <label>
                    <input
                        type="radio"
                        @click=${() => demoState.showVars = 1}
                        .checked=${demoState.showVars === 1}
                    />
                    <code-small>counter1</code-small> and
                    <code-small>data1</code-small>
                </label>

                <label>
                    <input
                        type="radio"
                        @click=${() => demoState.showVars = 2}
                        .checked=${demoState.showVars === 2}
                    />
                    <code-small>counter2</code-small> and
                    <code-small>data2</code-small>
                </label>

            </div>

            <div class="value">Counter: ${counter}</div>
            <div class="value">Data: ${data}</div>

        `;

    }

    getVars() {
        if (demoState.showVars === 1) {
            return [demoState.counter1, demoState.data1.getValue()];
        } else if (demoState.showVars === 2) {
            return [demoState.counter2, demoState.data2.getValue()];
        }
    }

    static get styles() {

        return css`

            #varsChooser label {
                display: block;
                margin: 5px 0;
                padding: 5px;
                background: #BBB;
                border-radius: 5px;
                cursor: pointer;
            }

            #varsChooser label input {
                margin: 0 5px 0;
            }

        `;

    }

}
