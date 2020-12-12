import { css } from 'lit-element';
import { LitStateElement } from '@app/lit-state';


export class DemoComponent extends LitStateElement {

    static getStyles() {
        if (!this.styles) {
            return this._defaultStyles;
        } else if (Array.isArray(this.styles)) {
            return [this._defaultStyles, ...this.styles];
        } else {
            return [this._defaultStyles, this.styles];
        }
    }

    static get _defaultStyles() {

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

            .status {
                margin: 20px 0;
                font-weight: 600;
                font-size: 16px;
                color: blue;
            }

            .value {
                margin: 20px 0;
                font-weight: 600;
                font-size: 16px;
                color: red;
            }

            .buttons {
                display: flex;
                flex-wrap: wrap;
                margin: -5px 0 0 -5px;
            }

            .buttons > * {
                margin: 5px 0 0 5px;
            }

        `;

    }

}
