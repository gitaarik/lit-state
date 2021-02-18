import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('api-lit-state')
export class ApiLitState extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>LitState</code></h1>

            <p>
                This is the API reference for advanced usage. See
                <lit-docs-link path="basic-usage/">Basic usage</lit-docs-link>
                on how to use this class.
            </p>

            <h2>class LitState</h2>

            <h3>
                Property <code>stateVars</code>
            </h3>

            <p>
                Contains the <code>stateVar</code> variables that have been
                defined (either through decorators or not). It's an object with
                the name in the key and the options in the value:
            </p>

            <p>
                <code-block .code=${this.stateVarFormat}></code-block>
            </p>

            <p>
                The default <code>stateVar</code> handler doesn't require any
                options. But the options can be used to specify a
                <lit-docs-link path="advanced-usage/state-var-handler/">custom
                <code>stateVar</code> handler</lit-docs-link>.
                A custom handler might also accept extra options:
            </p>

            <p>
                <code-block .code=${this.stateVarFormatWithCustomHandler}></code-block>
            </p>

            <h3>Method <code>addObserver(observer, keys)</code></h3>

            <p>
                Add a observer to this state class. This is for when you need
                to observe the state outside of a LitElement component, see
                <lit-docs-link path="advanced-usage/manually-observe-state/">Manually observe state</lit-docs-link>.
                For usage with LitElement, use the 
                <lit-docs-link path="basic-usage/#usage-in-component"><code>observeState()</code> mixin</lit-docs-link>.
            </p>

            <h4><code>observer</code></h4>

            <p>
                Function that will be called when the state changes. This
                function will get as a first argument the name of the
                <code>stateVar</code> that has been changed.
            </p>

            <h4><code>keys</code></h4>

            <p>
                An Array of names of <code>stateVar</code> variables to
                observe. Only if those <code>stateVar</code> variables change,
                the <code>observer</code> will be called. If not provided, the
                <code>observer</code> will be called when any
                <code>stateVar</code> variable changes.
            </p>

            <p>
                <code-block .code=${this.addObserverCode}></code-block>
            </p>

            <h3>Method <code>removeObserver(observer)</code></h3>

            <p>
                Removes a previously added observer. The <code>observer</code>
                argument should be the same as the <code>observer</code>
                argument given to <code>addObserver()</code>:
            </p>

            <p>
                <code-block .code=${this.removeObserverCode}></code-block>
            </p>

        `;

    }

    get stateVarFormat() {
        return `{
    myStateVar1: {},
    myStateVar2: {}
}`;
    }

    get stateVarFormatWithCustomHandler() {
        return `{
    myStateVar1: {},
    myStateVar2: {},
    customStateVar: {
        handler: CustomStateVarHandler,
        extraOption: 'value'
    }
}`;
    }

    get addObserverCode() {
        return `const myObserver = function(name) {
    console.log('stateVar', name, 'changed!');
}

// Observe any \`stateVar\` variable:
myState.addObserver(myObserver);

// Or only observe specific \`stateVar\` variables:
myState.addObserver(myObserver, ['myStateVar1', 'myStateVar2']);`;
    }

    get removeObserverCode() {
        return `const myObserver = function(changedKey) { /* ... */ }

// Add the observer:
myState.addObserver(myObserver);

// ... later on remove the observer again:
myState.removeObserver(myObserver);`;
    }


}
