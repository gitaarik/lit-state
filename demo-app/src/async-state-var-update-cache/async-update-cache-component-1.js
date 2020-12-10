import { customElement, html, css } from 'lit-element';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';


@customElement('async-update-cache-component-1')
export class AsyncUpdateCacheComponent1 extends LitStateElement {

    render() {

        return html`

            <h2>&lt;component-1&gt;</h2>
            <h3 id="status">Status: ${this.dataStatus}</h3>

            <h3 id="value">
                <span>Value:</span>
                <input
                    type="text"
                    .value=${demoState.data.getValue()}
                    @keyup=${this.handleInputKeyUp}
                    ?disabled=${demoState.data.isPending()}
                />
            </h3>

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

            :host {
                display: block;
                padding: 15px;
                background: lightgrey;
            }

            h2 {
                margin-top: 0;
                font-size: 20px;
                color: green;
            }

            h3 {
                font-size: 16px;
            }

            #status {
                color: blue;
            }

            #value {
                display: flex;
                color: red;
            }

            #value input {
                margin-left: 5px;
                min-width: 0;
            }

            #buttons {
                display: flex;
                flex-wrap: wrap;
                margin: -5px 0 0 -5px;
            }

            #buttons > * {
                margin: 5px 0 0 5px;
            }

        `;

    }

}
