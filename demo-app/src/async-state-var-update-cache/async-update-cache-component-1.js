import { customElement, LitElement, html, css } from 'lit-element';
import { observeState } from '@app/lit-state.js';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('async-update-cache-component-1')
export class AsyncUpdateCacheComponent1 extends DemoComponent(observeState(LitElement)) {

    render() {

        return html`

            <h2>&lt;component-1&gt;</h2>
            <div class="status">Status: ${this.dataStatus}</div>

            <div class="value">
                <span>Value:</span>
                <input
                    type="text"
                    .value=${demoState.data.getValue()}
                    @keyup=${this.handleInputKeyUp}
                    ?disabled=${demoState.data.isPending()}
                />
            </div>

            <div id="buttons">

                <button
                    @click=${() => demoState.data.reload()}
                    ?disabled=${demoState.data.isPending()}
                >
                    reload data
                </button>

                <button
                    @click=${() => demoState.data.pushCache()}
                    ?disabled=${demoState.data.isPending() || !demoState.data.isPendingCache()}
                >
                    push cache
                </button>

            </div>

        `;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'loading value...';
        } else if (demoState.data.isPendingSet()) {
            return 'updating value...'
        } else if (demoState.data.isPendingCache()) {
            return 'cache pending';
        } else if (demoState.data.isFulfilledGet()) {
            return 'value loaded';
        } else if (demoState.data.isFulfilledSet()) {
            return 'value updated';
        } else {
            return 'unknown';
        }
    }

    handleInputKeyUp(event) {
        demoState.data.setCache(event.target.value);
    }

    static get styles() {

        return css`

            .value {
                display: flex;
            }

            .value input {
                margin-left: 5px;
                min-width: 0;
            }

        `;

    }

}
