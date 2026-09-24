const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            propagationStopped: false,

            stopPropagation() {
                this.propagationStopped = true;
            }
        };

        let current = this;

        while (current) {
            event.currentTarget = current;
            current.emit(type, event);

            if (event.propagationStopped) {
                break;
            }

            current = current.parent;
        }
    }
}

const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);

function buttonHandler(event) {
    console.log(
        `Button handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

function formHandler(event) {
    console.log(
        `Form handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

function documentHandler(event) {
    console.log(
        `Document handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

button.addEventListener("click", buttonHandler);
form.addEventListener("click", formHandler);
documentElement.addEventListener("click", documentHandler);

console.log("\n--- Scenario A ---");
button.dispatchEvent("click", "Button clicked");

console.log("\n--- Scenario B ---");

form.removeEventListener("click", formHandler);

function formStopHandler(event) {
    console.log(
        `Form handler: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );

    event.stopPropagation();
}

form.addEventListener("click", formStopHandler);

button.dispatchEvent("click", "Button clicked");

console.log("\n--- Scenario C ---");

button.removeEventListener("click", buttonHandler);

button.dispatchEvent("click", "Button clicked");

console.log("\n--- Keypress Event ---");

function keypressHandler(event) {
    console.log(
        `Keypress on ${event.currentTarget.name}: key=${event.data.key}`
    );
}

form.addEventListener("keypress", keypressHandler);

form.dispatchEvent("keypress", { key: "Enter" });