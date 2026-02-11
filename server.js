const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("<h2>Simple Node.js Todo App is Running 🚀</h2>");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = {
    id: idCounter++,
    task,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = true;
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
