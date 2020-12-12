import { customElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('state-var-component-2')
export class StateVarComponent2 extends DemoComponent {

    render() {
        return html`
            <h2>&lt;component-2&gt;</h2>
            <div class="value">Counter: ${demoState.counter}</div>
            <button @click=${() => demoState.counter++}>increase counter</button>
        `;
    }

}
