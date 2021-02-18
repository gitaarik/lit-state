import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('api-state-var-handler')
export class ApiStateVarHandler extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>StateVar</code> handler</h1>

            <p>
                This is the default handler class for the <code>stateVar</code>
                variables. When you define a <code>stateVar</code> and you
                don't specify a custom handler class, this class will be used.
            </p>

            <p>
                A handler class controls what happens when a
                <code>stateVar</code> is being set or get. For more information
                on how to create a custom <code>stateVar</code> handler class,
                see <lit-docs-link path="advanced-usage/state-var-handler/">stateVar handler</lit-docs-link>.
            </p>

            <p>
                You shouldn't use a <code>StateVar</code> handler class
                directly as a user. You only need to know about it when
                defining a custom <code>StateVar</code> handler class. The
                handler class is called by LitState internally, so you don't
                need to call it yourself.
            </p>

            <h2>class <code>StateVar</code></h2>

            <h3><code>constructor(args)</code></h3>

            <p>
                The constructor takes a single argument <code>args</code> which
                is an object containing the following properties:
            </p>

            <table>
                <tr>
                    <th><code>options</code></th>
                    <td>The options given in the <code>stateVar</code> declaration.</td>
                </tr>
                <tr>
                    <th><code>recordRead</code></th>
                    <td>Callback to indicate the <code>stateVar</code> is read.</td>
                </tr>
                <tr>
                    <th><code>notifyChange</code></th>
                    <td>Callback to indicate the <code>stateVar</code> value has changed.</td>
                </tr>
                <tr>
                    <th><code>value</code></th>
                    <td>The initial value.</td>
                </tr>
            </table>

            <h3>method <code>get()</code></h3>

            <p>
                Called when the <code>stateVar</code> on the
                <code>LitState</code> class is read (for example:
                <code>myState.myStateVar</code>). Should return the value of
                the <code>stateVar</code>. Typically, this method should call
                the <code>recordRead()</code> callback, set in the
                <code>constructor()</code>, to indicate the observers that the
                <code>stateVar</code> is being read.
            </p>

            <h3>method <code>shouldSetValue(value)</code></h3>

            <p>
                Called before the <code>set()</code> method is called. If this
                method returns <code>false</code>, the <code>set()</code>
                method won't be called. This can be used for validation and/or
                optimization.
            </p>

            <h3>method <code>set(value)</code></h3>

            <p>
                Called when the <code>stateVar</code> on the
                <code>LitState</code> class is set (for example:
                <code>myState.myStateVar = 'value'</code>.
            </p>

            <p>
                Should set the value of the <code>stateVar</code>. Typically,
                this method would call the <code>notifyChange()</code>
                callback, set in the <code>constructor()</code>, to indicate
                the observers that the <code>stateVar</code> has changed.
            </p>

        `;

    }

    static get styles() {

        return css`

            table {
                border-collapse: collapse;
            }

            table tr th,
            table tr td {
                border: 1px var(--border-color) solid;
                padding: 10px;
            }

            table tr th {
                text-align: left;
            }

        `;

    }

    get defaultStateVarHandlerGet() {
        return `get() {
    this.recordRead();
    return this.value;
}`;
    }

}
