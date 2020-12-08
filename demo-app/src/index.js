import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import './state-var/index';
import './async-state-var/index';
import './async-state-var-update/index';


@customElement('lit-state-demo')
export class LitStateDemo extends LitStateElement {

    _hashChangeCallback = null;

    @property() activeTab = location.hash.substr(1) || 'state-var';

    connectedCallback() {
        super.connectedCallback();
        this.addHashChangeCallback();
    }

    addHashChangeCallback() {
        this._hashChangeCallback = window.addEventListener('hashchange', () => {
            this.activeTab = location.hash.substr(1);
            window.scrollTo({ top: 0 });

        });
    }

    render() {

        return html`

            <nav>

                <button
                    @click=${this.handleStateVarTabClick}
                    ?active=${this.activeTab == 'state-var'}
                >
                    stateVar
                </button>

                <button
                    @click=${this.handleAsyncStateVarTabClick}
                    ?active=${this.activeTab == 'async-state-var'}
                >
                    asyncStateVar
                </button>

                <button
                    @click=${this.handleAsyncStateVarUpdateTabClick}
                    ?active=${this.activeTab == 'async-state-var-update'}
                >
                    asyncStateVar update
                </button>

            </nav>

            ${this.tabContents}

        `;

    }

    handleStateVarTabClick() {
        location.hash = 'state-var';
    }

    handleAsyncStateVarTabClick() {
        location.hash = 'async-state-var';
    }

    handleAsyncStateVarUpdateTabClick() {
        location.hash = 'async-state-var-update';
    }

    get tabContents() {

        switch (this.activeTab) {

            default:
            case 'state-var':
                return html`<state-var></state-var>`;

            case 'async-state-var':
                return html`<async-state-var></async-state-var>`;

            case 'async-state-var-update':
                return html`<async-state-var-update></async-state-var-update>`;

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
