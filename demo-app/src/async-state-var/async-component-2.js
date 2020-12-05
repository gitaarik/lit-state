import { customElement, html, css } from 'lit-element';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';


@customElement('async-component-2')
export class AsyncComponent2 extends LitStateElement {

    render() {

        return html`

            <h2>&lt;component-2&gt;</h2>

            <h3>Status: ${this.dataStatus}</h3>
            <h3>Value: ${demoState.data.getValue()}</h3>

            <div id="buttons">

                <button
                    @click=${() => demoState.data.reload()}
                    ?disabled=${demoState.data.isPending()}
                >
                    reload data
                </button>

                <button
                    @click=${() => demoState.data.setValue('<component-2> updated the data!')}
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
                color: red;
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
