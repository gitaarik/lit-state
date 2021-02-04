import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './changing-component';
import './control-component';


@customElement('different-vars-on-rerender')
export class DifferentVarsOnRerender extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Different variables on re-render</h1>

            <p>
                This might seem obvious, but it's worth noting. This is a
                demonstration of a specific use case. And the way LitState is
                covers that. Also it gives some insight into how LitState
                works.
            </p>

            <p>
                The use case we are describing here is a component that could
                render different <code>stateVar</code> variables at every
                re-render. LitState needs to keep track of the
                <code>stateVar</code> variables that are used by your
                component. Therefore, LitState rescans the
                <code>stateVar</code> variables that are used in your component
                every time it renders.
            </p>

            <h2>Demonstration</h2>

            <p>
                In this example, <code>&lt;changing-component&gt;</code> only
                shows 1 counter at a time, depending on the value of
                <code>showCounter</code>.
                <code>&lt;control-component&gt;</code> shows them both, and you
                can modify them there.
            </p>

            <div class="demoComponents">
                <changing-component></changing-component>
                <control-component></control-component>
            </div>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>
                <code-block filename='changing-component.js' .code=${this.changingComponentCode}></code-block>
            </p>

        `;

    }

    get changingComponentCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('changing-component')
export class ChangingComponent extends observeState(LitElement) {

    get counter() {
        if (demoState.showCounter === 1) {
            return demoState.counter1;
        } else if (demoState.showCounter === 2) {
            return demoState.counter2;
        }
    }

    render() {

        return html\`

            <h2>&lt;changing-component&gt;</h2>

            <label>
                <input
                    type="radio"
                    @click=\${this.handleShowCounter1RadioClick}
                    .checked=\${demoState.showCounter === 1}
                />
                <code>counter1</code>
            </label>

            <label>
                <input
                    type="radio"
                    @click=\${this.handleShowCounter2RadioClick}
                    .checked=\${demoState.showCounter === 2}
                />
                <code>counter2</code>
            </label>

            <h3>Counter: \${this.counter}</h3>

        \`;

    }

    handleShowCounter1RadioClick() {
        demoState.showCounter = 1;
    }

    handleShowCounter2RadioClick() {
        demoState.showCounter = 2;
    }

}`;

    }


    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';
import { currentTime } from './utils.js'


class DemoState extends LitState {
    @stateVar() showCounter = 1;
    @stateVar() counter1 = 0;
    @stateVar() counter2 = 0;
}


export const demoState = new DemoState();`;

    }

}
