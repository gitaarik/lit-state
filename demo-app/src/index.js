import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import { counterState } from './counter-state';
import './sub-component-1';
import './sub-component-2';


@customElement('lit-state-demo')
export class LitStateDemo extends LitStateElement {

    render() {
        return html`

            <h1>&lt;lit-state-demo&gt;</h1>

            <p>
                This page consists of 3 components:
                <code>&lt;lit-state-demo&gt;</code>,
                <code>&lt;sub-component-1&gt;</code> and
                <code>&lt;sub-component-2&gt;</code>. They all use a shared
                state <code>counterState</code>. Whenever you increase the
                counter in one component, the other components automatically
                synchronize.
            </p>

            <h3>Counter: ${counterState.counter}</h3>
            <button @click=${counterState.increase}>increase</button>

            <sub-component-1></sub-component-1>
            <sub-component-2></sub-component-2>

        `;
    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin: 15px 0;
                padding: 15px;
                background: lightgrey;
                max-width: 600px;
            }

            h1 {
                margin: 0;
                font-size: 25px;
            }

            code {
                display: inline-block;
                padding: 2px;
                margin: 1px;
                background: #666;
                color: white;
                white-space: nowrap;
            }

        `;

    }

}
