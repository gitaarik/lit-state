import { css } from '../web_modules/lit-element.js';
import { litStyle } from '../web_modules/lit-element-style.js';
import '../web_modules/lit-docs.js';
export const demoComponentStyle = litStyle(css`

    h2 {
        margin-top: 0;
        font-size: 20px;
        color: green;
    }

    h3 {
        margin: 20px 0;
        font-weight: 600;
        font-size: 16px;
    }

    .status {
        color: blue;
    }

    .value {
        color: #cb2828;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        margin: -5px 0 0 -5px;
    }

    .buttons > * {
        margin: 5px 0 0 5px;
    }

`);