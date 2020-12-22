import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('control-component')
export class ControlComponent extends observeState(DemoComponent(LitElement)) {

    render() {

        return html`

            <h2>&lt;control-component&gt;</h2>

            <h3 class="value">
                Counter1:
                ${demoState.counter1}
                <button @click=${() => demoState.counter1++}>increase</button>
            </h3>

            <h3 class="value">
                Counter2:
                ${demoState.counter2}
                <button @click=${() => demoState.counter2++}>increase</button>
            </h3>

        `;

    }

}
