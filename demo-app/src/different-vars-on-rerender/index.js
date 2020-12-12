import { customElement, property, html, css } from 'lit-element';
import { DemoElement } from '@app/demo-element';
import '@app/components/code-small';
import '@app/components/code-big';
import './changing-component';
import './control-component';


@customElement('different-vars-on-rerender')
export class DifferentVarsOnRerender extends DemoElement {

    render() {

        return html`

            <div>

                <h1>Different variables on re-render</h1>

                <p>
                    When your component renders, LitState records which
                    <code-small>stateVar</code-small> and
                    <code-small>asyncStateVar</code-small> variables are
                    accessed by your component. Then it observes these
                    variables and re-renders the component when one of them
                    changes.
                </p>

                <p>
                    When a re-render renders different
                    <code-small>stateVar</code-small> and/or
                    <code-small>asyncStateVar</code-small> variables, they will
                    again be recorded and observed, so that the component also
                    re-renders when these new variables change:
                </p>

                <div id="demoComponents">
                    <changing-component></changing-component>
                    <control-component></control-component>
                </div>

                <p>
                    In this example,
                    <code-small>&lt;changing-component&gt;</code-small> only
                    shows 1 pair of variables at a time.
                    <code-small>&lt;control-component&gt;</code-small> shows
                    them all, and you can modify them there. You can see that
                    <code-small>&lt;changing-component&gt;</code-small> keeps
                    re-rendering itself when <code-small>stateVar</code-small>
                    variables it uses changes. Even when a re-render shows
                    different <code-small>stateVar</code-small> variables than
                    the previous render:
                </p>

                <p>
                    <code-big filename='changing-component.js' .code=${this.changingComponentCode}></code-big>
                </p>

                <p>
                    <code-small>counter1</code-small> and
                    <code-small>counter2</code-small> are
                    <code-small><a href="#state-var">stateVar</a></code-small> variables.
                    <code-small>data1</code-small> and
                    <code-small>data2</code-small> are
                    <code-small><a href="#async-state-var">asyncStateVar</a></code-small>
                    variables. For clarification, here's the source of
                    <code-small>demo-state.js</code-small>:
                </p>

                <p>
                    <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
                </p>

                <p>
                    You don't have to worry about which
                    <code-small>stateVar</code-small> or
                    <code-small>asyncStateVar</code-small> you render at which
                    time. As long as your component extends from
                    <code-small>LitStateElement</code-small> or uses the mixin
                    <code-small><a href="#mixin-usage">LitStateElementMixin</a></code-small>,
                    LitState will keep your component synchronized.
                </p>

            </div>

        `;

    }

    get changingComponentCode() {

        return `import { customElement, html } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state.js';


@customElement('changing-component')
export class ChangingComponent extends LitStateElement {

    render() {

        const [counter, data] = this.getVars();

        return html\`

            <h2>&lt;changing-component&gt;</h2>

            <div>

                <div>Show vars:</div>

                <label>
                    <input
                        type="radio"
                        @click=\${() => demoState.showVars = 1}
                        .checked=\${demoState.showVars === 1}
                    />
                    <code>counter1</code> and <code>data1</code>
                </label>

                <label>
                    <input
                        type="radio"
                        @click=\${() => demoState.showVars = 2}
                        .checked=\${demoState.showVars === 2}
                    />
                    <code>counter2</code> and <code>data2</code>
                </label>

            </div>

            <h3>Counter: \${counter}</h3>
            <h3>Data: \${data}</h3>

        \`;

    }

    getVars() {
        if (demoState.showVars === 1) {
            return [demoState.counter1, demoState.data1.getValue()];
        } else if (demoState.showVars === 2) {
            return [demoState.counter2, demoState.data2.getValue()];
        }
    }

}`;

    }


    get demoStateCode() {

        return `import { LitState, stateVar, asyncStateVar } from 'lit-element-state';
import { currentTime } from './utils.js'


class DemoState extends LitState {

    showVars = stateVar(1);
    counter1 = stateVar(0);
    counter2 = stateVar(0);

    data1 = asyncStateVar(
        () => this._getData1(),
        currentTime()
    );

    data2 = asyncStateVar(
        () => this._getData2(),
        currentTime()
    );

    _getData1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(currentTime());
            }, 3000);
        });
    }

    _getData2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(currentTime());
            }, 3000);
        });
    }

}


export const demoState = new DemoState();`;

    }

}
