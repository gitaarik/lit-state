import { customElement, LitElement, html } from 'lit-element';
import { demoComponentStyle } from '@app/demo-component.js';
import { observeState } from '@app/lit-state.js';
import { demoState } from './state';
import 'lit-docs';


@customElement('reconnect-control-component')
export class ReconnectControlComponent extends observeState(demoComponentStyle(LitElement)) {

    render() {

        return html`

            <showcase-box>

                <h2>&lt;control-component&gt;</h2>
                <h3 class="value">Counter: ${demoState.counter}</h3>

                <div class="buttons">

                    <button @click=${() => demoState.counter++}>increase counter</button>

                    <button
                        @click=${() => demoState.connected = false}
                        ?hidden=${!demoState.connected}
                    >
                        disconnect component
                    </button>

                    <button
                        @click=${() => demoState.connected = true}
                        ?hidden=${demoState.connected}
                    >
                        reconnect component
                    </button>

                </div>

            </showcase-box>

        `;

    }

}
