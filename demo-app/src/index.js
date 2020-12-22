import { customElement, LitElement, property, html, css } from 'lit-element';
import 'lit-element-demo-app-helpers';
import './basic-usage/index';
import './different-vars-on-rerender/index';


@customElement('lit-state-demo')
export class LitStateDemo extends LitElement {

    render() {
        return html`<demo-shell .pages=${this.pages}></demo-shell>`;
    }

	get pages() {
		return [
			{
				hash: 'basic-usage',
				title: 'Basic usage',
				template: html`<basic-usage></basic-usage>`
			},
			{
				hash: 'different-vars-on-rerender',
				title: 'Different vars on rerender',
				template: html`<different-vars-on-rerender></different-vars-on-rerender>`
			}
		];
	}

}
