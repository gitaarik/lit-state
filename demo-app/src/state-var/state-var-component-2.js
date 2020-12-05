import { customElement, html, css } from 'lit-element';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';


@customElement('state-var-component-2')
export class StateVarComponent2 extends LitStateElement {

    render() {

        return html`
            <h2>&lt;component-2&gt;</h2>
            <h3>Counter: ${demoState.counter}</h3>
            <button @click=${() => demoState.counter++}>increase counter</button>
        `;

    }

    static get styles() {

        return css`

            :host {
                display: block;
                padding: 15px;
                background: lightgrey;
            }

            h2 {
                margin-top: 0;
                font-size: 20px;
                color: green;
            }

            h3 {
                font-size: 16px;
                color: red;
            }

        `;

    }

}
