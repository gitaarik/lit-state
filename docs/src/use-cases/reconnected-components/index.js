import { customElement, LitElement, property, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import { demoState } from './state';
import './reconnecting-component';
import './reconnect-control-component';


@customElement('reconnected-components')
export class ReconnectedComponents extends LitDocsContent(LitElement) {

    firstUpdated() {
        super.firstUpdated();
        this.initConnectionCallback();
    }

    initConnectionCallback() {

        this.reconnectingComponent = this.shadowRoot.getElementById('reconnectingComponent');
        this.demoComponentsContainer = this.shadowRoot.getElementById('demoComponentsContainer');

        demoState.addObserver(() => this.initReconnectingComponentConnection(), ['connected']);

    }

    initReconnectingComponentConnection() {
        if (demoState.connected) {
            this.demoComponentsContainer.appendChild(this.reconnectingComponent);
        } else {
            this.demoComponentsContainer.removeChild(this.reconnectingComponent);
        }
    }

    render() {

        return html`

            <h1>Reconnected components</h1>

            <h2>Use case</h2>

            <ol>
                <li>A component that is observing some stateVar variables is rendered to the DOM.</li>
                <li>The component gets dynamically removed from the DOM.</li>
                <li>The state possibly changes.</li>
                <li>The same component instance gets added to the DOM again.</li>
            </ol>

            <h3>Execution</h3>

            <ul>
                <li>
                    When the component gets removed from the DOM
                    (<code>disconnectedCallback()</code>), the observers are
                    removed.
                </li>
                <li>
                    When it gets added to the DOM again
                    (<code>connectedCallback()</code>), the component is
                    rerendered again so the observers get added again.
                </li>
            </ul>

            <h2>Demo</h2>

            <div id="demoComponentsContainer" class="demoComponents">
                <reconnect-control-component></reconnect-control-component>
                <reconnecting-component id="reconnectingComponent"></reconnecting-component>
            </div>

        `;

    }

    get demoStateCode() {

        return `labberr`;

    }

}
