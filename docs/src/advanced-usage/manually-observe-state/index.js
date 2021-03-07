import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './observe-all-state-vars/automatic-component.js';
import './observe-all-state-vars/manual-component.js';
import './observe-specific-state-vars/specific-automatic-component.js';
import './observe-specific-state-vars/specific-manual-component.js';


@customElement('manually-observe-state')
export class ManuallyObserveState extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Manually observe the state</h1>

            <p>
                When you use the <code>observeState()</code> mixin,
                your LitState Element automatically observes the states you use
                in that component, and re-renders when the state changes. You
                can also manually add more observers that will be notified when
                your state changes. This can be handy if you have other parts
                of your app (different from your LitElement components) that
                need to know when a state has changed.
            </p>

            <div class="demoComponents">
                <automatic-component></automatic-component>
                <manual-component></manual-component>
            </div>

            <p>
                To add observers to a certain state instance, you just call
                <code>myState.addObserver(myCallback)</code>. The
                callback will be called any time a
                <code>stateVar</code> changes. The callback will
                get as a first argument the name of the
                <code>stateVar</code> that changed. To stop
                observing, call
                <code>myState.removeObserver(myCallback)</code>. It
                is similar to the way
                <code>document.addEventListener()</code> and
                <code>document.removeEventListener()</code> work.
            </p>

            <p>
                To keep the example simple, we still use a LitElement
                component. We just don't use the
                <code>observeState()</code> mixin. There are
                buttons to manually add and remove the observer:

            <p>
                <code-block filename='manual-component.js' .code=${this.manuallyObserveStateCode}></code-block>
            </p>

            <h2>Observe specific stateVars</h2>

            <p>
                As an optional second argument to
                <code>addObserver()</code>, you can provide an
                array with <code>stateVar</code> names that you
                want to observe. The callback will then only be called when any
                of those <code>stateVar</code> variables change.
            </p>

            <div class="demoComponents">
                <specific-automatic-component></specific-automatic-component>
                <specific-manual-component></specific-manual-component>
            </div>

            <p>
                <code-block filename='manual-component.js' .code=${this.manuallyObserveSpecificStateCode}></code-block>
            </p>

        `;

    }

    get manuallyObserveStateCode() {

        return `import { customElement, LitElement, property, html } from 'lit-element';
import { demoState } from './demo-state.js';


@customElement('manual-component')
export class ManualComponent extends LitElement {

    @property({type: Boolean})
    observing = false;

    render() {

        return html\`

            <h2>&lt;manual-component&gt;</h2>
            <h3>Counter: \${demoState.counter}</h3>

            <button
                @click=\${this.handleObserveButtonClick}
                ?hidden=\${this.observing}
            >
                observe
            </button>

            <button
                @click=\${this.handleUnobserveButtonClick}
                ?hidden=\${!this.observing}
            >
                unobserve
            </button>

        \`;

    }

    handleObserveButtonClick() {
        this.stateObserver = () => this.requestUpdate();
        demoState.addObserver(this.stateObserver);
        this.observing = true;
    }

    handleUnobserveButtonClick() {
        demoState.removeObserver(this.stateObserver);
        this.observing = false;
    }

}`;

    }

    get manuallyObserveSpecificStateCode() {

        return `import { customElement, LitElement, property, html } from 'lit-element';
import { demoState } from './demo-state.js';


@customElement('specific-manual-component')
export class SpecificManualComponent extends LitElement {

    @property({type: Boolean})
    observingCounter1 = false;

    @property({type: Boolean})
    observingCounter2 = false;

    render() {
        return html\`

            <h2>&lt;manual-component&gt;</h2>

            <h3 class="value">Counter1: \${demoState.counter1}</h3>

            <button
                @click=\${this.handleObserveCounter1ButtonClick}
                ?hidden=\${this.observingCounter1}
            >
                observe
            </button>

            <button
                @click=\${this.handleUnobserveCounter1ButtonClick}
                ?hidden=\${!this.observingCounter1}
            >
                unobserve
            </button>

            <h3 class="value">Counter2: \${demoState.counter2}</h3>

            <button
                @click=\${this.handleObserveCounter2ButtonClick}
                ?hidden=\${this.observingCounter2}
            >
                observe
            </button>

            <button
                @click=\${this.handleUnobserveCounter2ButtonClick}
                ?hidden=\${!this.observingCounter2}
            >
                unobserve
            </button>

        \`;

    }

    handleObserveCounter1ButtonClick() {
        this.counter1Observer = () => this.requestUpdate();
        demoState.addObserver(this.counter1Observer, ['counter1']);
        this.observingCounter1 = true;
    }

    handleUnobserveCounter1ButtonClick() {
        demoState.removeObserver(this.counter1Observer);
        this.observingCounter1 = false;
    }

    handleObserveCounter2ButtonClick() {
        this.counter2Observer = () => this.requestUpdate();
        demoState.addObserver(this.counter2Observer, ['counter2']);
        this.observingCounter2 = true;
    }

    handleUnobserveCounter2ButtonClick() {
        demoState.removeObserver(this.counter2Observer);
        this.observingCounter2 = false;
    }

}`;

    }

}
