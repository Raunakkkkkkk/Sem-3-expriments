const EventEmitter = require("events");

const button = new EventEmitter();

// Similar to addEventListener()
button.on("click", () => {
    console.log("Button was clicked!");
});

button.on("mouseover", () => {
    console.log("Mouse is over the button!");
});

// Trigger events
button.emit("click");
button.emit("mouseover");