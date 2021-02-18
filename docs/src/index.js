import { customElement, LitElement, property, html } from 'lit-element';
import 'lit-docs';
import './intro-page';
import './basic-usage/index';
import './no-decorator-usage/index';
import './different-vars-on-rerender/index';
import './state-handling';
import './computed-values/index';
import './nested-states/index';
import './advanced-usage/state-var-handler/index';
import './advanced-usage/manually-observe-state/index';
import './api/lit-state';
import './api/state-var-handler';
import './api/observe-state-mixin';
import './api/state-var-decorator';
import './api/state-recorder';


@customElement('lit-state-docs')
export class LitStateDocs extends LitElement {

    render() {
        return html`<lit-docs-ui docsTitle="LitState" .pages=${this.pages}></lit-docs-ui>`;
    }

	get pages() {
		return [
			{
				title: 'Introduction',
				path: 'intro-page',
				template: html`<intro-page></intro-page>`
			},
			{
				title: 'Basic usage',
				path: 'basic-usage',
				template: html`<basic-usage></basic-usage>`,
                submenu: [
                    {
                        title: 'Usage without decorators',
                        path: 'no-decorator-usage',
                        template: html`<no-decorator-usage></no-decorator-usage>`
                    }
                ]
			},
            {
                title: 'State handling',
                path: 'state-handling',
                template: html`<state-handling></state-handling>`,
                submenu: [
                    {
                        title: 'Computed values',
                        path: 'computed-values',
                        template: html`<computed-values></computed-values>`
                    },
                    {
                        title: 'Nested states',
                        path: 'nested-states',
                        template: html`<nested-states></nested-states>`
                    },
                    {
                        title: 'Different vars on re-render',
                        path: 'different-vars-on-rerender',
                        template: html`<different-vars-on-rerender></different-vars-on-rerender>`
                    }
                ]
            },
            {
                title: 'Advanced usage',
                path: 'advanced-usage',
                submenu: [
                    {
                        title: 'StateVar handler',
                        path: 'state-var-handler',
                        template: html`<state-var-handler></state-var-handler>`
                    },
                    {
                        title: 'Manually observe state',
                        path: 'manually-observe-state',
                        template: html`<manually-observe-state></manually-observe-state>`
                    }
                ]
            },
            {
                title: 'API reference',
                path: 'api-reference',
                submenu: [
                    {
                        title: 'LitState class',
                        path: 'lit-state',
                        template: html`<api-lit-state></api-lit-state>`
                    },
                    {
                        title: '@stateVar() decorator',
                        path: 'state-var-decorator',
                        template: html`<api-state-var-decorator></api-state-var-decorator>`
                    },
                    {
                        title: 'observeState() mixin',
                        path: 'observe-state-mixin',
                        template: html`<api-observe-state-mixin></api-observe-state-mixin>`
                    },
                    {
                        title: 'StateVar handler class',
                        path: 'state-var-handler',
                        template: html`<api-state-var-handler></api-state-var-handler>`
                    },
                    {
                        title: 'stateRecorder object',
                        path: 'state-recorder',
                        template: html`<api-state-recorder></api-state-recorder>`
                    }
                ]
            }
		];
	}

}
