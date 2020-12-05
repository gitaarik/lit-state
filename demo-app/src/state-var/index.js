import { customElement, property, html, css } from 'lit-element';
import hljs from 'highlight.js/lib/core';
import { hljsStyles } from '../hljs-styles.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import { LitStateElement } from '../lit-state.js';
import { demoState } from './state';
import './state-var-component-1';
import './state-var-component-2';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


@customElement('state-var')
export class StateVar extends LitStateElement {

    firstUpdated() {
        super.firstUpdated();
        this.initHighlightJs();
    }

    initHighlightJs() {
        this.shadowRoot.querySelectorAll('.bigCode').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    render() {

        return html`

            <div>

                <h1>LitState <code>stateVar</code> demo</h1>

                <p>
                    Below you see 2 components. They both use a shared state
                    <code>demoState</code>. When you change the state from one
                    component, the other component automatically synchronizes:
                </p>

                <div id="demoComponents">
                    <state-var-component-1></state-var-component-1>
                    <state-var-component-2></state-var-component-2>
                </div>

                <p>
                    The shared state <code>demoState</code> contains a
                    <code>stateVar</code> called <code>counter</code>. It holds an
                    integer that has an initial value of <code>0</code>:
                </p>

                <p>
                    <code class="fileName">demo-state.js</code>
                    <code class="bigCode">${this.demoStateCode}</code>
                </p>

                <p>
                    The components that use the state extend from
                    <code>LitStateElement</code> instead of
                    <code>LitElement</code>. This makes them automatically
                    re-render when a <code>stateVar</code> they use changes:
                </p>

                <p>
                    <code class="fileName">component-1.js</code>
                    <code class="bigCode">${this.componentCode}</code>
                </p>

                <p>
                    That's all. How simple do you want to have it?
                </p>

            </div>

        `;

    }

    get dataStatus() {
        if (demoState.data.isPendingGet()) {
            return 'getting value...';
        } else if (demoState.data.isPendingSet()) {
            return 'setting value...'
        } else {
            return 'done';
        }
    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {
    counter = stateVar(0);
}

export const demoState = new DemoState();`;

    }

    get componentCode() {

        return `import { customElement, html } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import { demoState } from './demo-state.js';

@customElement('component-1')
export class Component1 extends LitStateElement {

    render() {
        return html\`
            <h2>&lt;component-1&gt;</h2>
            <h3>Counter: \${demoState.counter}</h3>
            <button @click=\${() => demoState.counter++}>
                increase counter
            </button>
        \`;
    }

}`;

    }

    static get styles() {

        return [
            hljsStyles,
            css`

                :host {
                    display: block;
                    margin-top: 25px;
                }

                * {
                    box-sizing: border-box;
                }

                h1 {
                    margin: 0;
                    font-size: 25px;
                }

                h2 {
                    margin: 30px 0 0;
                    font-size: 20px;
                }

                h3 {
                    font-size: 18px;
                    color: red;
                }

                code {
                    display: inline-block;
                    padding: 2px;
                    margin: 1px;
                    background: #555;
                    color: white;
                    white-space: pre;
                }

                .fileName {
                    display: block;
                    margin: 0;
                    padding: 7px 10px;
                    background: #555;
                    font-weight: bold;
                }

                .bigCode {
                    display: block;
                    margin: 0;
                    padding: 10px;
                    width: 100%;
                }

                #demoComponents {
                    display: flex;
					flex-wrap: wrap;
                    margin: -15px 0 0 -15px;
                }

                #demoComponents > * {
                    border: 1px #666 solid;
                    margin: 15px 0 0 15px;
                }

            `
        ];

    }

}
