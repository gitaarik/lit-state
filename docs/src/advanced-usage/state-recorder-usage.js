import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('state-recorder-usage')
export class StateRecorderUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>stateRecorder</code></h1>


            <p>
                LitState needs to know which <code>stateVar</code> variables
                are being used by your components. That's why you need to add
                the <code>observeState()</code> mixin to your
                <code>LitElement</code> components. The
                <code>observeState()</code> mixin uses the
                <code>stateRecorder</code> to record which
                <code>stateVar</code> variables have been accessed during it's
                last render cycle.
            </p>

            <h2>Automatic usage with the <code>observeState()</code> mixin</h2>

            <p>
                Just before a component that uses the
                <code>observeState()</code> mixin is being rendered,
                <code>stateRecorder.start()</code> is being called to start
                recording <code>stateVar</code> that are being read.
                When a <code>stateVar</code> is being read, it's
                <lit-docs-link path="api-reference/state-var-handler/">handler</lit-docs-link>
                will notify the <code>stateRecorder</code> object that it's
                being read.
            </p>

            <p>
                When the render of a component has finished, the
                <code>stateRecorder.finish()</code> method is called. This
                stops recording <code>stateVar</code> variables, and returns
                the recorded <code>stateVar</code> variables. The collected
                <code>stateVar</code> variables are then observed. When one of
                them changes, the component re-renders itself.
            </p>

            <h2>Manual usage</h2>

            <p>
                So when you use the <code>observeState()</code> mixin on your
                <code>LitElement</code> components, this is all being taken
                care of for you. However, for custom implementations, you might
                want to use the <code>stateRecorder</code> manually. You could
                for example, create a <code>observeState()</code> variation for
                React. That would re-render your React component when a
                <code>stateVar</code> changes.
            </p>

        `;

    }

}
