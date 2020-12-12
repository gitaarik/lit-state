import { customElement, LitElement, html, css } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('control-component')
export class ControlComponent extends DemoComponent {

    render() {

        return html`

            <h2>&lt;control-component&gt;</h2>

            <div class="value">
                Counter1:
                ${demoState.counter1}
                <button @click=${() => demoState.counter1++}>increase</button>
            </div>

            <div class="value">
                Counter2:
                ${demoState.counter2}
                <button @click=${() => demoState.counter2++}>increase</button>
            </div>

            <div class="value">

                Data1:
                ${demoState.data1.getValue()}

                <button
                    @click=${() => demoState.data1.reload()}
                    ?disabled=${demoState.data1.isPending()}
                >
                    ${demoState.data1.isPending() ? 'loading..' : 'reload'}
                </button>

            </div>

            <div class="value">

                Data2:
                ${demoState.data2.getValue()}

                <button
                    @click=${() => demoState.data2.reload()}
                    ?disabled=${demoState.data1.isPending()}
                >
                    ${demoState.data2.isPending() ? 'loading..' : 'reload'}
                </button>

            </div>

        `;

    }

}
