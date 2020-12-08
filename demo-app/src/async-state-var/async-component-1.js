import { customElement, html, css } from 'lit-element';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';


@customElement('async-component-1')
export class AsyncComponent1 extends LitStateElement {

    render() {

        return html`

            <h2>&lt;component-1&gt;</h2>

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
