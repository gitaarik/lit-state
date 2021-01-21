import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';


@customElement('no-deco-component-1')
export class NoDecoComponent1 extends observeState(DemoComponent(LitElement)) {

    render() {
        return html`
            <h2>&lt;component-1&gt;</h2>
            <h3 class="value">Counter: ${demoState.counter}</h3>
            <button @click=${() => demoState.counter++}>increase counter</button>
        `;
    }

}
