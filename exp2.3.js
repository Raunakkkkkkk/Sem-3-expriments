const fs = require("fs");

fs.appendFileSync("example.txt", "\nThis content was added later.");
console.log("File updated successfully.");