import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './computed-value-component.js';


@customElement('computed-values')
export class ComputedValues extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Computed values</h1>

            <p>
                You can have helper methods on your
                <code>LitState</code> class that return computed
                values, or update multiple values at the same time.
            </p>

            <p>
                <computed-value-component></computed-value-component>
            </p>

            <p>
                In our state class, we have a getter function that returns the
                sum of both numbers. Also there is a method that increases both
                numbers.
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>
                Out component makes use of these helper methods, so that it
                doesn't have to do this work itself.
            </p>

            <p>
                <code-block filename='computed-value-component.js' .code=${this.computedValueComponentCode}></code-block>
            </p>

        `;

    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state.js';

class DemoState extends LitState {

    @stateVar() number1 = 0;
    @stateVar() number2 = 0;

    get sum() {
        return this.number1 + this.number2;
    }

    increaseBoth() {
        this.number1++;
        this.number2++;
    }

}

export const demoState = new DemoState();`;

    }

    get computedValueComponentCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('computed-value-component')
export class ComputedValueComponent extends observeState(LitElement) {

    render() {

        return html\`

            <h2>&lt;computed-value-component&gt;</h2>

            <h3>
                Number 1:
                <input
                    type="number"
                    .value=\${demoState.number1}
                    @change=\${this.handleNumber1InputChange}
                ></input>
            </h3>

            <h3>
                Number 2:
                <input
                    type="number"
                    .value=\${demoState.number2}
                    @change=\${this.handleNumber2InputChange}
                ></input>
            </h3>

            <h3>
                <button @click=\${this.handleIncreaseBothButtonClick}>Increase both</button>
            </h3>

            <h3>Sum: \${demoState.sum}</h3>

        \`;

    }

    handleNumber1InputChange(event) {
        demoState.number1 = parseInt(event.target.value);
    }

    handleNumber2InputChange(event) {
        demoState.number2 = parseInt(event.target.value);
    }

    handleIncreaseBothButtonClick() {
        demoState.increaseBoth();
    }

}`;

    }

}
