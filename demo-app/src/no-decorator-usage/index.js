import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './no-deco-component-1';
import './no-deco-component-2';


@customElement('no-decorator-usage')
export class NoDecoratorUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Usage without decorator</h1>

            <p>
                In case you can't or don't want to use decorators, you can
                define the stateVars with a static
                <code>stateVars</code> getter method. Then you can
                use the <code>constructor</code> to set the initial
                values.
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>The result it the same as when you would use decorators.</p>

            <div class="demoComponents">
                <no-deco-component-1></no-deco-component-1>
                <no-deco-component-2></no-deco-component-2>
            </div>

            <p>
                It is basically the same how you would define LitElement
                properties without decorators.
            </p>

        `;

    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {

    static get stateVars() {
        return {
            counter: {}
        };
    }

    constructor() {
        super();
        this.counter = 0;
    }

}

export const demoState = new DemoState();`;

    }

}
