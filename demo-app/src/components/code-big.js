import { customElement, LitElement, property, html, css } from 'lit-element';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


@customElement('code-big')
export class CodeBig extends LitElement {

    @property() fileName;
    @property() code;

    firstUpdated() {
        super.firstUpdated();
        this._initHighlightJs();
    }

    _initHighlightJs() {
        this.shadowRoot.querySelectorAll('.hljs').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    render() {
        return html`
            ${this._fileName}
            <code class="hljs">${this.code}</code>
        `;
    }

    get _fileName() {

        if (!this.fileName) {
            return;
        }

        return html`<code class="fileName">${this.fileName}</code>`;

    }

    static get styles() {

        return css`

            :host {
                display: block;
            }

            .fileName {
                display: block;
                margin: 0;
                padding: 7px 10px;
                background: #555;
                color: #FFF;
                font-weight: bold;
            }

            .hljs {
                display: block;
                box-sizing: border-box;
                margin: 0;
                padding: 10px;
                width: 100%;
                white-space: pre;
                overflow-x: auto;
                color: #ffffff;
                background: #1c1b1b;
            }

            .hljs-comment {
                color: #999999;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-meta-keyword,
            .hljs-doctag,
            .hljs-section,
            .hljs-selector-class,
            .hljs-meta,
            .hljs-selector-pseudo,
            .hljs-attr {
                color: #88aece;
            }

            .hljs-attribute {
                color: v#c59bc1;
            }

            .hljs-name,
            .hljs-type,
            .hljs-number,
            .hljs-selector-id,
            .hljs-quote,
            .hljs-template-tag,
            .hljs-built_in,
            .hljs-title,
            .hljs-literal {
                color: #f08d49;
            }

            .hljs-string,
            .hljs-regexp,
            .hljs-symbol,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-link,
            .hljs-selector-attr,
            .hljs-meta-string {
                color: #b5bd68;
            }

            .hljs-bullet,
            .hljs-code {
                color: #cccccc;
            }

            .hljs-deletion {
                color: #de7176;
            }

            .hljs-addition {
                color: #76c490;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: bold;
            }

        `;

    }

}
