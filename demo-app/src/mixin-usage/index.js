import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from '@app/lit-state';
import { demoState } from './state';
import '@app/components/code-small';
import '@app/components/code-big';
import './mixin-component.js';


@customElement('mixin-usage')
export class MixinUsage extends LitStateElement {

    render() {

        return html`

            <div>

                <h1>LitState <code-small>LitStateElementMixin</code-small> demo</h1>

                <p>
                    You can also use a mixin
                    <code-small>LitStateElementMixin</code-small> instead of
                    extending from <code-small>LitStateElement</code-small>:
                </p>

                <code-big .code=${this.mixinCode}></code-big>
                <mixin-component></mixin-component>

            </div>

        `;

    }

    get mixinCode() {
        return `import { LitElement, html } from 'lit-element';
import { LitStateElementMixin } from 'lit-element-state';
import { demoState } from './state.js';


class MixinComponent extends LitStateElementMixin(LitElement) {

    render() {

        return html\`
            <h2>&lt;mixin-component&gt;</h2>
            <h3>Counter: \${demoState.counter}</h3>
            <button @click=\${() => demoState.counter++}>increase counter</button>
        \`;

    }

}`;
    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin-top: 25px;
            }

            h1 {
                margin: 0;
                font-size: 25px;
            }

        `;

    }

}
