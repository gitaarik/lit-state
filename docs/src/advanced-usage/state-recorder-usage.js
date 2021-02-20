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
                <code>stateRecorder</code> object to record which
                <code>stateVar</code> variables have been accessed during it's
                last render cycle.
            </p>

            <h2>Automatic usage with the <code>observeState()</code> mixin</h2>

            <p>
                The <code>observeState()</code> mixin automatically uses the
                <code>stateRecorder</code> to record which
                <code>stateVar</code> variables are used by your component.
                Just before the component renders,
                <code>stateRecorder.start()</code> is being called to start
                recording. When a <code>stateVar</code> is being read, it's
                <lit-docs-link path="api-reference/state-var-handler/">handler</lit-docs-link>
                will record it to the <code>stateRecorder</code>.
            </p>

            <p>
                When the component has finished rendering, the
                <code>stateRecorder.finish()</code> method is called. This
                stops recording <code>stateVar</code> variables, and returns
                the recorded ones. These collected <code>stateVar</code>
                variables are then observed, and when one of them changes, the
                component re-renders itself.
            </p>

            <p>
                So when you use the <code>observeState()</code> mixin on your
                <code>LitElement</code> components, this is all being taken
                care of for you.
            </p>

            <h2>Manual usage</h2>

            <p>
                For custom implementations, you might want to use the
                <code>stateRecorder</code> manually. You could for example,
                create a <code>observeState()</code> variation for React. That
                would re-render a React component when a <code>stateVar</code>
                that is used inside the component changes. See the
                <lit-docs-link path="advanced-usage/state-recorder-usage/">API reference</lit-docs-link>
                for more information on how to use <code>stateRecorder</code>.
            </p>

        `;

    }

}
