import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('automatic-component')
export class AutomaticComponent extends observeState(DemoComponent(LitElement)) {

    render() {
        return html`
            <h2>&lt;automatic-component&gt;</h2>
            <h3 class="value">Counter: ${demoState.counter}</h3>
            <button @click=${this.handleIncreaseCounterButtonClick}>increase counter</button>
        `;
    }

    handleIncreaseCounterButtonClick() {
        demoState.counter++;
    }

}
