import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state';


@customElement('sub-component-2')
export class SubComponent2 extends LitStateElement {

    render() {

        return html`

            <h2>&lt;sub-component-2&gt;</h2>

            <div id="items">

                <div>
                    <h3>Counter: ${demoState.counter}</h3>
                    <button @click=${() => demoState.increaseCounter()}>increase counter</button>
                </div>

                <div>

                    <h3>Async Data: ${demoState.data.getValue()}</h3>

                    <button @click=${() => demoState.data.reload()} ?disabled=${demoState.data.isPending()}>
                        reload data
                    </button>

                </div>

            </div>

        `;

    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin-top: 15px;
                padding: 15px;
                background: #BBB;
            }

            h2 {
                margin-top: 0;
                font-size: 20px;
            }

            #items {
                display: flex;
                justify-content: space-between;
            }

        `;

    }

}
