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
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).send({ message: 'Invalid task name' });
    }

    const newTask = todosModel.create(taskName);
    res.send(newTask);
};

module.exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { taskName } = req.body;

    if (!taskName) {
        return res.status(400).send({
            message: 'Invalid task name'
        });
    }

    const updatedTask = todosModel.update(Number(id), taskName);

    if (!updatedTask) {
        return res.status(404).send({
            message: `No task with the id ${id}`
        });
    }
    res.send(updatedTask);
};

module.exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).send({
            message: `No task with the id ${id}`
        });
    }

    const deletedTask = todosModel.destroy(Number(id));
    res.send(deletedTask);
};