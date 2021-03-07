import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';


@customElement('use-cases')
export class UseCases extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Use cases</h1>

            <p>
                This subsection contains demonstrations of specific use cases.
                And the way LitState covers those use cases. These pages also
                act as a way to test these use cases.
            </p>

        `;

    }

}
