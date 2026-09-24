const express = require("express");

const app = express();

app.use(express.json());

// GET
app.get("/users", (req, res) => {
    res.send("GET: Fetch all users");
});

// POST
app.post("/users", (req, res) => {
    res.send("POST: Create a new user");
});

// PUT
app.put("/users/:id", (req, res) => {
    res.send("PUT: Update user with ID " + req.params.id);
});

// DELETE
app.delete("/users/:id", (req, res) => {
    res.send("DELETE: Delete user with ID " + req.params.id);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});