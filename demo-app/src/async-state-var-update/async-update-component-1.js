import { customElement, LitElement, html, css } from 'lit-element';
import { observeState } from '@app/lit-state.js';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('async-update-component-1')
export class AsyncUpdateComponent1 extends DemoComponent(observeState(LitElement)) {

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
                    @click=${() => demoState.data.setValue('<component-1> updated the data!')}
                    ?disabled=${demoState.data.isPending()}
                >
                    update data
                </button>

                <button
                    @click=${() => demoState.simulateErrorReload()}
                    ?disabled=${demoState.data.isPending()}
                >
                    reload error
                </button>

                <button
                    @click=${() => demoState.simulateErrorUpdate()}
                    ?disabled=${demoState.data.isPending()}
                >
                    update error
                </button>

            </div>

        `;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'loading value...';
        } else if (demoState.data.isPendingSet()) {
            return 'updating value...'
        } else if (demoState.data.isRejectedGet()) {
            return 'loading failed with error: "' + demoState.data.getErrorGet() + '"';
        } else if (demoState.data.isRejectedSet()) {
            return 'updating failed with error: "' + demoState.data.getErrorSet() + '"';
        } else if (demoState.data.isFulfilledGet()) {
            return 'value loaded';
        } else if (demoState.data.isFulfilledSet()) {
            return 'value updated';
        } else {
            return 'unknown';
        }
    }

}
