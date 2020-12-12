import { customElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('state-var-component-1')
export class StateVarComponent1 extends DemoComponent {

    render() {
        return html`
            <h2>&lt;component-1&gt;</h2>
            <div class="value">Counter: ${demoState.counter}</div>
            <button @click=${() => demoState.counter++}>increase counter</button>
        `;
    }

}
