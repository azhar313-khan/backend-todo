const Todo = require("../model/Todo");

exports.createTode = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description });
    res.status(201).json({ message: "New todo created successfully", newTodo });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.updateTodos = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todos = await Todo.findByIdAndUpdate(req.params.id, {
      title: title,
      description: description,
      completed: completed,
    });
    res.status(201).json({ message: "Todos updated successfully", todos });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.json({ message: "Todos not Found" });
    res.status(201).json({ message: "Todos deleted successfully", todo });
  } catch (err) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(201).json(todo);
  } catch (error) {
    console.log(err, "error");
    res.status(404).send({ message: "server error", err });
  }
};
