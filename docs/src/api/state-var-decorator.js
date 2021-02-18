import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('api-state-var-decorator')
export class ApiStateVarDecorator extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>@stateVar()</code> decorator</h1>

            <p>
                This decorator function is used to define <code>stateVar</code>
                variables on a <code>LitState</code> derived class. When these
                variables are set or get from the <code>LitState</code> class,
                for example <code>myState.myStateVar = 'value'</code>, the
                observers of the <code>LitState</code> class will be notified.
            </p>

            <h2><code>@stateVar(options)</code></h2>

            <h3><code>options</code></h3>

            <p>
                Optional parameter that should be a object containing the
                options for the <code>StateVar</code> handler class. The
                default <code>StateVar</code> handler class doesn't take any
                options. You can use the option <code>handler</code> to specify
                a <lit-docs-link path="advanced-usage/state-var-handler/">custom
                <code>StateVar</code> handler class</lit-docs-link>. Other
                options you specify will be passed on to this custom
                <code>StateVar</code> handler class.
            </p>

            <p>
                <code-block .code=${this.stateVarOptionsCode}></code-block>
            </p>

        `;

    }

    get stateVarOptionsCode() {

        return `@stateVar({
    handler: MyStateVarHandler,
    myOption: 'value'
})
myStateVar = 'value';`;

    }

}
