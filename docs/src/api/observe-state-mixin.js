import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('api-observe-state-mixin')
export class ApiObserveStateMixin extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>observeState()</code> mixin</h1>

            <p>
                This mixin is meant to be used on your components that extend
                from <code>LitElement</code>. You apply the mixin by wrapping
                the <code>LitElement</code> class with this mixin function:
                <code>observeState(LitElement)</code>.
            </p>

            <p>
                This makes your <code>LitElement</code> component aware of any
                <code>stateVar</code> variables. When <code>stateVar</code>
                variables are being read by the component during render, it
                will record this. Then when any of the recorded
                <code>stateVar</code> variables are being changed, the
                component re-renders itself.
            </p>

            <h2><code>observeState(litElementClass)</code></h2>

            <p>
                Add "<code>stateVar</code> awareness" to the given
                <code>litElementClass</code>, which should be a class
                definition of, or an extend from, LitElement's
                <code>LitElement</code> class.
            </p>

        `;

    }

}
