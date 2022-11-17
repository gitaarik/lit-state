import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('state-handling')
export class StateHandling extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>State handling</h1>

            <p>
                Typically you would keep your state class (which extends from
                <code>LitState</code>) in a separate file, where the created
                instance of your state class is exported:
            </p>

            <p>
                <code-block filename='state.js' .code=${this.stateCode}></code-block>
            </p>

            <p>
                Then you import the state in the component file where you need
                it. And use <code>observeState()</code> to decorate your components:
            </p>

            <p>
                <code-block filename='component.js' .code=${this.componentCode}></code-block>
            </p>

            <p>
                But you could also have your state and all your components in
                one file if you like. Or do it any other way that works for
                you.
            </p>

        `;

    }

    get stateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';
        
class MyState extends LitState {
    @stateVar() myStateVar = 'myValue';
}

export const myState = new MyState();`;

    }

    get componentCode() {

        return `import { LitElement, html } from 'lit-element';
import { observeState } from 'lit-element-state';
import { myState } from './state.js';

class MyComponent extends observeState(LitElement) {
    // ..
}`;

    }

}
