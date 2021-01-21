import { customElement, LitElement, property, html } from 'lit-element';
import { DemoComponent } from '@app/demo-component.js';
import { demoState } from './state';


@customElement('manual-component')
export class ManualComponent extends DemoComponent(LitElement) {

    @property({type: Boolean})
    observing = false;

    render() {
        return html`

            <h2>&lt;manual-component&gt;</h2>
            <h3 class="value">Counter: ${demoState.counter}</h3>

            <button
                @click=${this.handleObserveButtonClick}
                ?hidden=${this.observing}
            >
                observe
            </button>

            <button
                @click=${this.handleUnobserveButtonClick}
                ?hidden=${!this.observing}
            >
                unobserve
            </button>

        `;
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

}
