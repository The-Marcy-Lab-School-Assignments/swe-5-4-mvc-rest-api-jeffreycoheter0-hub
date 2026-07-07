// Import the todo model
const todosModel = require('../models/todoModel.js');

// Controller functions

module.exports.listTodos = (req, res) => {
    const listTodos = todosModel.list();
    res.send(listTodos);
};

module.exports.findTodo = (req, res) => {
    const { id } = req.params;
    const task = todosModel.find(Number(id));

    if (!task) {
        return res.status(404).send({
            message: `No task with the id ${id}`
        });
    }
    res.send(task);
};

module.exports.createTodo = (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send({ message: 'Invalid task name' });
    }

    const newTask = todosModel.create(task);
    res.status(201).send(newTask);
};

module.exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    const updatedTask = todosModel.update(Number(id), changes);

    if (!updatedTask) {
        return res.status(404).send({
            message: `No task with the id ${id}`
        });
    }
    res.send(updatedTask);
};

module.exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    const deleted = todosModel.destroy(Number(id));

    if (!deleted) {
        return res.status(404).send({
            message: `No task with the id ${id}`
        });
    }
    res.status(204).send();
};