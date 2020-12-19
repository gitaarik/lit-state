import { customElement, LitElement, html, css } from 'lit-element';
import { observeState } from '@app/lit-state.js';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('async-component-1')
export class AsyncComponent1 extends DemoComponent(observeState(LitElement)) {

    render() {

        return html`

            <h2>&lt;component-1&gt;</h2>

            <div class="status">Status: ${this.dataStatus}</div>
            <div class="value">Value: ${demoState.data.getValue()}</div>

            <div class="buttons">

                <button
                    @click=${() => demoState.data.reload()}
                    ?disabled=${demoState.data.isPending()}
                >
                    reload data
                </button>

                <button
                    @click=${() => demoState.simulateErrorReload()}
                    ?disabled=${demoState.data.isPending()}
                >
                    simulate error
                </button>

            </div>

        `;

    }

    get dataStatus() {
        if (demoState.data.isPending()) {
            return 'loading value...';
        } else if (demoState.data.isRejected()) {
            return 'loading failed with error: "' + demoState.data.getError() + '"';
        } else if (demoState.data.isFulfilled()) {
            return 'value loaded';
        } else {
            return 'unknown';
        }
    }

}
