const EventEmitter = require("events");

class SessionManager extends EventEmitter {
    constructor() {
        super();

        this.on("greet", (username) => {
            console.log(`Hello, ${username}! Welcome.`);
        });

        this.on("exit", (code) => {
            console.log(`Session closed with code ${code}. Goodbye!`);
        });

        this.once("greet", () => {
            console.log("First login of the day!");
        });

        this.on("error", (message) => {
            console.log(`Error: ${message}`);
        });
    }

    trigger(command, ...args) {
        if (command === "greet" || command === "exit") {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}

const session = new SessionManager();

session.trigger("greet", "Raunak");
session.trigger("greet", "Aman");
session.trigger("greet", "Rahul");

console.log("Greet listener count:", session.listenerCount("greet"));

session.trigger("exit", 0);

session.trigger("login");

session.emit("error", "Something went wrong in the session.");