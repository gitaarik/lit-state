import { customElement, LitElement, property, html, css } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';
import 'lit-element-demo-app-helpers';


@customElement('intro-page')
export class IntroPage extends DemoPage(LitElement) {

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
                <code-big .code=${'npm install lit-element-state'}></code-big>
            </p>

            <h2>Usage</h2>

            <h3>1. Create a <code-small>LitState</code-small> object:</h3>

            <p>
                Use the <code-small>stateVar()</code-small> decorator to define
                the variables that should be observed by LitState.
            </p>

            <p>
                <code-big filename='my-state.js' .code=${this.stateCode}></code-big>
            </p>

            <h3>2. Make your component aware of your state:</h3>

            <p>
                Use the <code-small>observeState()</code-small> mixin on your
                <code-small>LitElement</code-small> components to make them
                re-render when any <code-small>stateVar</code-small> variables
                they use changes.
            </p>

            <p>
                <code-big filename='component.js' .code=${this.componentCode}></code-big>
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
            <button @click=\${() => myState.counter++}></button>
        \`;
    }

}`;

    }

}
