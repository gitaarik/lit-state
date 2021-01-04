import { customElement, LitElement, property, html, css } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';
import 'lit-element-demo-app-helpers';
import './changing-component';
import './control-component';


@customElement('different-vars-on-rerender')
export class DifferentVarsOnRerender extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Different variables on re-render</h1>

            <p>
                When your component renders, LitState records which
                <code-small>stateVar</code-small> variables are accessed by
                your component. Then it observes these variables and re-renders
                itself when one of these variables change.
            </p>

            <p>
                When a re-render renders different
                <code-small>stateVar</code-small> variables than the previous
                render, these new variables will again be recorded and
                observed, so that the component also re-renders when these new
                variables change:
            </p>

            <div class="demoComponents">
                <changing-component></changing-component>
                <control-component></control-component>
            </div>

            <p>
                In this example,
                <code-small>&lt;changing-component&gt;</code-small> only shows
                1 counter at a time.
                <code-small>&lt;control-component&gt;</code-small> shows them
                both, and you can modify them there. You can see that
                <code-small>&lt;changing-component&gt;</code-small> keeps
                re-rendering when any counter it shows changes. Even when a
                re-render shows a different counter than the previous render:
            </p>

            <p>
                <code-big filename='changing-component.js' .code=${this.changingComponentCode}></code-big>
            </p>

            <p>
                <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
            </p>

            <p>
                You don't have to worry about which
                <code-small>stateVar</code-small> you render at which time. As
                long as your component uses the
                <code-small>observeState</code-small> mixin, your component
                will stay synchronized.
            </p>

        `;

    }

    get changingComponentCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('changing-component')
export class ChangingComponent extends observeState(LitElement) {

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

    get counter() {
        if (demoState.showCounter === 1) {
            return demoState.counter1;
        } else if (demoState.showCounter === 2) {
            return demoState.counter2;
        }
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
