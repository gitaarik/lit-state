import { customElement, LitElement, html } from 'lit-element';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';
import 'lit-docs';


@customElement('state-var-component-2')
export class StateVarComponent1 extends observeState(demoComponentStyle(LitElement)) {

    render() {
        return html`
            <showcase-box>
                <h2>&lt;component-2&gt;</h2>
                <h3 class="value">Counter: ${demoState.counter}</h3>
                <button @click=${this.handleIncreaseCounterButtonClick}>increase counter</button>
            </showcase-box>
        `;
    }

    handleIncreaseCounterButtonClick() {
        demoState.counter++;
    }
}
