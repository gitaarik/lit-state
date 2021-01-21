import { LitDocsContent } from 'lit-docs';
import { litStyle } from 'lit-element-style';
import 'lit-docs';


const demoComponentStyle = litStyle(css`

    .status {
        color: blue;
    }

    .value {
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

`);


export const DemoComponent = superclass => class extends demoComponentStyle(LitDocsContent(superclass)) {

    render() {
        return html`<showcase-box>${super.render()}</showcase-box>`;
    }

}
