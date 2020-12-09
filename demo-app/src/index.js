import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import './state-var/index';
import './async-state-var/index';
import './async-state-var-update/index';
import './mixin-usage/index';


@customElement('lit-state-demo')
export class LitStateDemo extends LitStateElement {

    _hashChangeCallback = null;
    _navItems = [
        ['state-var', 'stateVar'],
        ['async-state-var', 'asyncStateVar'],
        ['async-state-var-update', 'asyncStateVar update'],
        ['mixin-usage', 'Mixin'],
    ];

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
                ${this.navButtons}
            </nav>

            ${this.tabContents}

        `;

    }

    get navButtons() {

        return this._navItems.map(item => {

            return html`
                <button
                    @click=${() => location.hash = item[0]}
                    ?active=${this.activeTab == item[0]}
                >
                    ${item[1]}
                </button>
            `;

        });

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

            case 'mixin-usage':
                return html`<mixin-usage></mixin-usage>`;

        }

    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin: 0 auto;
                padding: 15px;
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
