import { customElement, LitElement, html, css } from 'lit-element';
import { LitStateElementMixin } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('mixin-component')
export class MixinComponent extends LitStateElementMixin(LitElement) {

    render() {

        return html`
            <h2>&lt;mixin-component&gt;</h2>
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
