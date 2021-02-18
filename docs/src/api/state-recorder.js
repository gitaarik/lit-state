import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('api-state-recorder')
export class ApiStateRecorder extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>stateRecorder</code> object</h1>

            <p>
                This object is used by the
                <lit-docs-link path="api-reference/observe-state-mixin/"><code>observeState()</code> mixin</lit-docs-link>,
                to get the <code>stateVar</code> variabes that have been
                accesed during a render cycle.
            </p>

            <h2>Methods</h2>

            <h3><code>start()</code></h3>

            <p>
                Starts the recorder. After calling this, every
                <code>stateVar</code> variable that is being read, will be
                recorded, until <code>finish()</code> is called.
            </p>

            <h3><code>recordRead(stateObj, key)</code></h3>

            <p>
                If there is a recorder started (by <code>start()</code>) and
                hasn't finished yet (by <code>finish()</code>); records that a
                <code>stateVar</code> has been read.
            </p>

            <table>
                <tr>
                    <th>stateObj</th>
                    <td>
                        The instance of the <code>LitState</code> derived
                        class, on which the accessed <code>stateVar</code> has
                        been defined.
                    </rd>
                </tr>
                <tr>
                    <th>key</th>
                    <td>
                        The varname of the <code>stateVar</code> variable as
                        defined on the <code>LitState</code> class.
                    </rd>
                </tr>
            </table>

            <h3><code>finish()</code></h3>

            <p>
                Stops recording <code>stateVar</code> variables, started by the
                <code>start()</code> method, and returns the recorded
                <code>stateVar</code> variables in a <code>Map()</code> object.
            </p>

        `;

    }

}
