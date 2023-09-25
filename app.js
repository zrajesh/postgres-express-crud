const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require("./controllers/todoController");
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// POST
app.post("/createtodo", createTodo);
// GET
app.get("/todos", getTodos);
app.get("/todo/:id", getTodo);
// PUT
app.put("/updatetodo/:id", updateTodo);
// DELETE
app.delete("/delete/:id", deleteTodo);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
