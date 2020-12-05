import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import './state-var/index';
import './async-state-var/index';


@customElement('lit-state-demo')
export class LitStateDemo extends LitStateElement {

    @property() activeTab = 'demo1';

    render() {

        return html`

            <nav>

                <button
                    @click=${this.handleDemo1TabClick}
                    ?active=${this.activeTab == 'demo1'}
                >
                    stateVar
                </button>

                <button
                    @click=${this.handleAsyncStateVarTabClick}
                    ?active=${this.activeTab == 'async-state-var'}
                >
                    asyncStateVar
                </button>

            </nav>

            ${this.tabContents}

        `;

    }

    handleDemo1TabClick() {
        this.activeTab = 'demo1';
    }

    handleAsyncStateVarTabClick() {
        this.activeTab = 'async-state-var';
    }

    get tabContents() {

        switch (this.activeTab) {

            default:
            case 'demo1':
                return html`<state-var></state-var>`;

            case 'async-state-var':
                return html`<async-state-var></async-state-var>`;

        }

    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin: 0 auto;
                max-width: 720px;
            }

            nav {
                display: flex;
            }

            nav button {
                margin: 0;
                padding: 10px;
                border: 1px #999 solid;
                border-left-width: 0;
                background: #DDD;
                color: #000;
                cursor: pointer;
            }

            nav button:first-child {
                border-left-width: 1px;
            }

            nav button:hover {
                background: #EEE;
            }

            nav button[active] {
                background: #FFF;
            }

        `;

    }

}
