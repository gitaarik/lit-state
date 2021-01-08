import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('no-deco-component-2')
export class NoDecoComponent2 extends observeState(DemoComponent(LitElement)) {

    render() {
        return html`
            <h2>&lt;component-2&gt;</h2>
            <h3 class="value">Counter: ${demoState.counter}</h3>
            <button @click=${() => demoState.counter++}>increase counter</button>
        `;
    }

}
