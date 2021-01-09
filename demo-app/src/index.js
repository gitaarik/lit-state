import { customElement, LitElement, property, html, css } from 'lit-element';
import 'lit-element-demo-app-helpers';
import './intro-page';
import './basic-usage/index';
import './no-decorator-usage/index';
import './different-vars-on-rerender/index';
import './computed-values/index';
import './nested-states/index';
import './state-var-handler/index';


@customElement('lit-state-demo')
export class LitStateDemo extends LitElement {

    render() {
        return html`<demo-shell .pages=${this.pages}></demo-shell>`;
    }

	get pages() {
		return [
			{
				hash: 'intro-page',
				title: 'Introduction',
				template: html`<intro-page></intro-page>`
			},
			{
				hash: 'basic-usage',
				title: 'Basic usage',
				template: html`<basic-usage></basic-usage>`
			},
			{
				hash: 'no-decorator-usage',
				title: 'Usage without decorators',
				template: html`<no-decorator-usage></no-decorator-usage>`
			},
            {
				hash: 'different-vars-on-rerender',
				title: 'Different vars on re-render',
				template: html`<different-vars-on-rerender></different-vars-on-rerender>`
			},
			{
				hash: 'computed-values',
				title: 'Computed values',
				template: html`<computed-values></computed-values>`
			},
			{
				hash: 'nested-states',
				title: 'Nested states',
				template: html`<nested-states></nested-states>`
            },
			{
				hash: 'state-var-handler',
				title: 'StateVar handler',
				template: html`<state-var-handler></state-var-handler>`
            }
		];
	}

}
