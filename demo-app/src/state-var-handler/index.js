import { customElement, LitElement, property, html, css } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';
import 'lit-element-demo-app-helpers';
import './custom-state-var-handler-component';


@customElement('state-var-handler')
export class StateVarHandler extends DemoPage(LitElement) {

    render() {

        return html`

            <h1><code-small>stateVar</code-small> handler</h1>

            <p>
                You can also define your own <code-small>stateVar</code-small>
                handler class. This allows you to have custom functionality
                when you read/write your stateVars. For example, a
                <code-small>LocalStorageHandler</code-small> that saves your
                <code-small>stateVar</code-small> values to
                <code-small>localStorage</code-small>. So that your state is
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
                <code-small>StateVar</code-small>. This default handler class
                looks like this:
            </p>

            <p>
                <code-big filename='lit-state.js' .code=${this.litStateStateVarHandlerCode}></code-big>
            </p>

            <p>
                You see that the constructor sets some default variables. These
                can be used when defining the behavior of our handler. In our
                extend of this class, we override the
                <code-small>constructor()</code-small> and
                <code-small>set()</code-small> methods:
            </p>

            <p>
                <code-big filename='local-storage-handler.js' .code=${this.localStorageHandlerCode}></code-big>
            </p>

            <p>
                Like this, when the <code-small>stateVar</code-small> is
                created, the initial value is set to any previously set
                <code-small>localStorage</code-small> value, or else to
                <code-small>options.initialValue</code-small>. And whenever a
                new value is set, it is saved to
                <code-small>localStorage</code-small>. The option
                <code-small>localStorageKey</code-small> is used as the key for
                the <code-small>localStorage</code-small>.
            </p>

            <p>
                Now let's see how we use this custom
                <code-small>stateVar</code-small> handler in our
                <code-small>demoState</code-small> class:
            </p>

            <p>
                <code-big filename='demo-state.js' .code=${this.demoStateCode}></code-big>
            </p>

            <p>
                You see that we tell LitState to use a different handler by
                specifying the <code-small>handler</code-small> option. The
                other options are options of our own custom handler. The
                <code-small>initialValue</code-small> should be set through an
                option. It can't be set like <code-small>counter = 0</code-small>,
                because that would be seen as a regular assignment, and would
                override any previously value in
                <code-small>localStorage</code-small>.
            </p>

            <p>
                If you use your custom <code-small>stateVar</code-small>
                handler a lot, it could be useful to also make a custom
                decorator function:
            </p>

            <p>
                <code-big .code=${this.localStorageHandlerDecoratorCode}></code-big>
            </p>

            <p>
                This allows you to define the <code-small>stateVar</code-small>
                like this:
            </p>

            <p>
                <code-big filename='demo-state.js' .code=${this.demoStateCustomDecoratorCode}></code-big>
            </p>

            <p>
                Custom <code-small>stateVar</code-small> handlers give you a
                lot of power for customizing what happens when your
                <code-small>stateVar</code-small> variables are being get/set.
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
