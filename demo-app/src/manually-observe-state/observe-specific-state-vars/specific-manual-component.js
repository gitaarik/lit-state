import { customElement, LitElement, property, html } from 'lit-element';
import { DemoComponent } from 'lit-element-demo-app-helpers';
import { demoState } from './state';


@customElement('specific-manual-component')
export class SpecificManualComponent extends DemoComponent(LitElement) {

    @property({type: Boolean})
    observingCounter1 = false;

    @property({type: Boolean})
    observingCounter2 = false;

    render() {

        return html`

            <h2>&lt;manual-component&gt;</h2>

            <h3 class="value">Counter1: ${demoState.counter1}</h3>

            <button
                @click=${this.handleObserveCounter1ButtonClick}
                ?hidden=${this.observingCounter1}
            >
                observe
            </button>

            <button
                @click=${this.handleUnobserveCounter1ButtonClick}
                ?hidden=${!this.observingCounter1}
            >
                unobserve
            </button>

            <h3 class="value">Counter2: ${demoState.counter2}</h3>

            <button
                @click=${this.handleObserveCounter2ButtonClick}
                ?hidden=${this.observingCounter2}
            >
                observe
            </button>

            <button
                @click=${this.handleUnobserveCounter2ButtonClick}
                ?hidden=${!this.observingCounter2}
            >
                unobserve
            </button>

        `;

    }

    handleObserveCounter1ButtonClick() {
        this.counter1Observer = () => this.requestUpdate();
        demoState.addObserver(this.counter1Observer, 'counter1');
        this.observingCounter1 = true;
    }

    handleUnobserveCounter1ButtonClick() {
        demoState.removeObserver(this.counter1Observer);
        this.observingCounter1 = false;
    }

    handleObserveCounter2ButtonClick() {
        this.counter2Observer = () => this.requestUpdate();
        demoState.addObserver(this.counter2Observer, 'counter2');
        this.observingCounter2 = true;
    }

    handleUnobserveCounter2ButtonClick() {
        demoState.removeObserver(this.counter2Observer);
        this.observingCounter2 = false;
    }

}
