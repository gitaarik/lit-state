import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './no-deco-component-1';
import './no-deco-component-2';


@customElement('no-decorator-usage')
export class NoDecoratorUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Usage without decorators</h1>

            <p>
                In case you can't or don't want to use
                <a target="_blank" href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">decorators</a>,
                you can define the stateVars with a static
                <code>stateVars</code> getter method. Then you can use the
                <code>constructor</code> to set the initial values. It is
                basically the same how you would define
                <a target="_blank" href="https://lit-element.polymer-project.org/guide/properties#declare">LitElement properties</a>
                without decorators.
            </p>

            <h2>Example</h2>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <h2>Output</h2>

            <div class="demoComponents">
                <no-deco-component-1></no-deco-component-1>
                <no-deco-component-2></no-deco-component-2>
            </div>

        `;

    }

    get demoStateCode() {

        return `import { LitState } from 'lit-element-state';

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
