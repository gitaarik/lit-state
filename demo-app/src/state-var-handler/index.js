import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsContent } from 'lit-docs';
import 'lit-docs';
import './custom-state-var-handler-component';


@customElement('state-var-handler')
export class StateVarHandler extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1><code>stateVar</code> handler</h1>

            <p>
                You can also define your own <code>stateVar</code>
                handler class. This allows you to have custom functionality
                when you read/write your stateVars. For example, a
                <code>LocalStorageHandler</code> that saves your
                <code>stateVar</code> values to
                <code>localStorage</code>. So that your state is
                retained when you refresh your page.
            </p>

            <p>
                The following component uses such a handler. To try it out,
                change the value and refresh the page.
            </p>

            <div class="demoComponents">
                <custom-state-var-handler-component></custom-state-var-handler-component>
            </div>

            <p>
                We implement this handler by creating a new class that extends
                from the default handler class
                <code>StateVar</code>. This default handler class
                looks like this:
            </p>

            <p>
                <code-block filename='lit-state.js' .code=${this.litStateStateVarHandlerCode}></code-block>
            </p>

            <p>
                You see that the constructor sets some default variables. These
                can be used when defining the behavior of our handler. In our
                extend of this class, we override the
                <code>constructor()</code> and
                <code>set()</code> methods:
            </p>

            <p>
                <code-block filename='local-storage-handler.js' .code=${this.localStorageHandlerCode}></code-block>
            </p>

            <p>
                Like this, when the <code>stateVar</code> is
                created, the initial value is set to any previously set
                <code>localStorage</code> value, or else to
                <code>options.initialValue</code>. And whenever a
                new value is set, it is saved to
                <code>localStorage</code>. The option
                <code>localStorageKey</code> is used as the key for
                the <code>localStorage</code>.
            </p>

            <p>
                Now let's see how we use this custom
                <code>stateVar</code> handler in our
                <code>demoState</code> class:
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCode}></code-block>
            </p>

            <p>
                You see that we tell LitState to use a different handler by
                specifying the <code>handler</code> option. The
                other options are options of our own custom handler. The
                <code>initialValue</code> should be set through an
                option. It can't be set like <code>counter = 0</code>,
                because that would be seen as a regular assignment, and would
                override any previously value in
                <code>localStorage</code>.
            </p>

            <p>
                If you use your custom <code>stateVar</code>
                handler a lot, it could be useful to also make a custom
                decorator function:
            </p>

            <p>
                <code-block .code=${this.localStorageHandlerDecoratorCode}></code-block>
            </p>

            <p>
                This allows you to define the <code>stateVar</code>
                like this:
            </p>

            <p>
                <code-block filename='demo-state.js' .code=${this.demoStateCustomDecoratorCode}></code-block>
            </p>

            <p>
                Custom <code>stateVar</code> handlers give you a
                lot of power for customizing what happens when your
                <code>stateVar</code> variables are being get/set.
            </p>

        `;

    }

    get litStateStateVarHandlerCode() {

        return `// ...
        
export class StateVar {

    constructor(args) {
        this.options = args.options; // The options given in the \`stateVar\` declaration
        this.recordRead = args.recordRead; // Callback to indicate the \`stateVar\` is read
        this.notifyChange = args.notifyChange; // Callback to indicate the \`stateVar\` value has changed
        this.value = undefined; // The initial value
    }

    // Called when the \`stateVar\` on the \`State\` class is read.
    get() {
        this.recordRead();
        return this.value;
    }

    // Returns whether the given \`value\` should be passed on to the \`set()\`
    // method. Can be used for validation and/or optimization.
    shouldSetValue(value) {
        return this.value !== value;
    }

    // Called when the \`stateVar\` on the \`State\` class is set.
    set(value) {
        this.value = value;
        this.notifyChange()
    }

}

// ...`;

    }

    get localStorageHandlerCode() {

        return `import { StateVar } from 'lit-element-state';
        
export class LocalStorageHandler extends StateVar {

    constructor(args) {
        super(args);
        this.value = (
            localStorage.getItem(this.options.localStorageKey)
            || this.options.initialValue
        );
    }

    set(value) {
        super.set(value);
        localStorage.setItem(this.options.localStorageKey, value);
    }

}`;

    }

    get demoStateCode() {

        return `import { LitState, stateVar } from 'lit-element-state';

class DemoState extends LitState {

    @stateVar({
        handler: LocalStorageHandler,
        localStorageKey: 'counter',
        initialValue: 0
    })
    counter;

}`;

    }

    get localStorageHandlerDecoratorCode() {

        return `function localStorageStateVar(options) {
    return stateVar(Object.assign(
        {handler: LocalStorageHandler},
        options
    ));
}`;

    }

    get demoStateCustomDecoratorCode() {

        return `class DemoState extends LitState {

    @localStorageStateVar({
        localStorageKey: 'counter',
        initialValue: 0
    })
    counter;

}`;

    }

}
