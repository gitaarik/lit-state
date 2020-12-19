import { LitElement, css } from 'lit-element';


export class DemoElement extends LitElement {

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
            }

            * {
                box-sizing: border-box;
            }

            h1 {
                margin: 0;
                font-size: 25px;
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

            a {
                color: #000;
            }

            #demoComponents {
                display: flex;
                flex-wrap: wrap;
                margin: -15px 0 0 -15px;
            }

            #demoComponents > * {
                border: 1px #666 solid;
                margin: 15px 0 0 15px;
                max-width: 290px;
            }

        `;

    }

}
