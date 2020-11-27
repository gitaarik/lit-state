import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import { counterState } from './counter-state';


@customElement('sub-component-2')
export class SubComponent2 extends LitStateElement {

    render() {
        return html`
            <h2>&lt;sub-component-2&gt;</h2>
            <h3>Counter: ${counterState.counter}</h3>
            <button @click=${counterState.increase}>increase</button>
        `;
    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin-top: 15px;
                padding: 15px;
                background: #BBB;
            }

            h2 {
                margin-top: 0;
                font-size: 20px;
            }

        `;

    }

}
