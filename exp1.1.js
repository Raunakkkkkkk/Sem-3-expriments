
const EventEmitter = require("events");

const emitter = new EventEmitter();

// Greet event
emitter.on("greet", (name) => {
    console.log("Hello " + name);
});

// Exit event
emitter.on("exit", () => {
    console.log("Program is exiting...");
});

// Trigger events
emitter.emit("greet", "rishurajputtt");
emitter.emit("exit");
