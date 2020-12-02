import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import { demoState } from './demo-state';
import './sub-component-1';
import './sub-component-2';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


@customElement('lit-state-demo')
export class LitStateDemo extends LitStateElement {

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
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/default.min.css"></link>

            <h1>&lt;lit-state-demo&gt;</h1>

            <p>
                This page consists of 3 components:
                <code>&lt;lit-state-demo&gt;</code>,
                <code>&lt;sub-component-1&gt;</code> and
                <code>&lt;sub-component-2&gt;</code>. They all use a shared
                state <code>demoState</code>. When you change the state in one
                component, the other components automatically synchronize.
            </p>

            <div id="items">

                <div>
                    <h3>Counter: ${demoState.counter}</h3>
                    <button @click=${demoState.increase}>increase counter</button>
                </div>

                <div>

                    <h3>Async Data: ${demoState.data.getValue()}</h3>

                    <button @click=${demoState.data.reload} ?disabled=${demoState.data.isPending()}>
                        reload data
                    </button>

                </div>

            </div>

            <sub-component-1></sub-component-1>
            <sub-component-2></sub-component-2>

            <h2>Explanation</h2>

            <p>
                On the left side you see a simple <code>stateVar</code> called
                <code>counter</code>. It holds an integer that has an initial
                value of <code>0</code>. The button increases the value by
                <code>1</code>. The value can be simply read with
                <code>demoState.counter</code> and set by
                <code>demoState.counter = 5;</code> for example. When it is set,
                the components that use the <code>stateVar</code> automatically
                re-render to show the new value.
            </p>

            <p>
                On the right side you see an <code>asyncStateVar</code> called
                <code>data</code>. An <code>asyncStateVar</code> is a special
                variable that contains a promise. The promise is automatically
                executed when the variable is being used. You can check the
                status of the promise with the functions
                <code>isPending()</code>, <code>isRejected()</code> and
                <code>isFulfilled()</code> on <code>demoState.data</code>.
                Based on the status of the promise you can then either call
                <code>getResult()</code> or <code>getError()</code>. There's
                also a convenient function <code>getValue()</code> that returns
                <code>getResult()</code> when the promise is fulfilled,
                <code>getError()</code> when the promise is rejected, or the
                default value when the promise is still pending. The default
                value can optionally be set with the second argument to the
                <code>asyncStateVar()</code> function (the first argument is
                the promise). You can also reload the promise by calling
                <code>reload()</code>. The explanation will be clarified by
                looking at the source code below.
            </p>

            <p>
                The <code>demoState</code> code looks like this:
            </p>

            <p>
                <code class="bigCode">${this.demoStateCode}</code>
            </p>

            <p>
                The components that use the state simply
                <code>import { demoState } from './demo-state.js</code> and
                then use <code>demoState.counter</code> (for
                <code>stateVar</code>) and
                <code>demoState.data.getValue()</code> (for
                <code>asyncStateVar</code>) in the template to get the values
                from the state.
            </p>

            <p>
                As an illustration, the <code>render()</code> method of
                <code>&lt;sub-component-1&gt;</code> looks like this:
            </p>

            <p>
                <code class="bigCode">${this.component1Code}</code>
            </p>

        `;

    }

    get demoStateCode() {

        return `import { LitState, stateVar, asyncStateVar } from './lit-state.js';


class DemoState extends LitState {

    counter = stateVar(0);
    data = asyncStateVar(this.getData, 'loading...');

    increase = () => {
        this.counter++;
    }

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Math.random().toString().substr(2));
            }, 3000);
        });
    }

}


export const demoState = new DemoState();`;

    }

    get component1Code() {

        return `<h2>&lt;sub-component-1&gt;</h2>

<div id="items">

    <div>
        <h3>Counter: \${demoState.counter}</h3>
        <button @click=\${demoState.increase}>increase counter</button>
    </div>

    <div>

        <h3>Async Data: \${demoState.data.getValue()}</h3>

        <button @click=\${demoState.data.reload} ?disabled=\${demoState.data.isPending()}>
            reload data
        </button>

    </div>

</div>`;

    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin: 15px 0;
                padding: 15px;
                background: lightgrey;
                max-width: 720px;
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

            code {
                display: inline-block;
                padding: 2px;
                margin: 1px;
                background: #666;
                color: white;
                white-space: pre;
            }

            .bigCode {
                padding: 10px;
                width: 100%;
            }

            #items {
                display: flex;
                justify-content: space-between;
            }

        `;

    }

}
