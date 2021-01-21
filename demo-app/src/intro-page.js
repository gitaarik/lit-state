import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('intro-page')
export class IntroPage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>LitState</h1>

            <h2>Simple shared app state management for LitElement</h2>

            <p>
                LitState automatically re-renders your LitElement
                components, when a shared app state variable they use
                changes. It's like LitElement's properties, but then shared
                over multiple components.
            </p>

            <h2>Installation</h2>

            <p>
                <code-block .code=${'npm install lit-element-state'}></code-block>
            </p>

            <h2>Usage</h2>

            <h3>1. Create a <code>LitState</code> object:</h3>

            <p>
                Use the <code>stateVar()</code> decorator to define
                the variables that should be observed by LitState.
            </p>

            <p>
                <code-block filename='my-state.js' .code=${this.stateCode}></code-block>
            </p>

            <h3>2. Make your component aware of your state:</h3>

            <p>
                Use the <code>observeState()</code> mixin on your
                <code>LitElement</code> components to make them
                re-render when any <code>stateVar</code> variables
                they use changes.
            </p>

            <p>
                <code-block filename='component.js' .code=${this.componentCode}></code-block>
            </p>

        `;

    }

    get stateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class MyState extends LitState {
    @stateVar() counter = 0;
}

export const myState = new MyState();`;

    }

    get componentCode() {

        return `import { LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { myState } form './my-state.js';

class MyComponent extends observeState(LitElement) {

    render() {
        return html\`
            <h1>Counter: \${myState.counter}</h1>
            <button @click=\${this.handleIncreaseCounterButtonClick}></button>
        \`;
    }

    handleIncreaseCounterButtonClick() {
        myState.counter++;
    }

}`;

    }

}
