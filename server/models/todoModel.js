let id = 1;
const getId = () => id++;

const todos = [
    { id: getId(), task: 'Buy groceries', isDone: false },
    { id: getId(), task: 'Walk the dog', isDone: true },
    { id: getId(), task: 'Read a book', isDone: false },
];

// Copy of the todos array
module.exports.list = () => {
    return [...todos];
};

// Copy of the matching todo, or null
module.exports.find = (id) => {
    const task = todos.find((task) => task.id === id);
    if (!task) {
        return null
    }
    return { ...task };
};

// The newly created todo
module.exports.create = (task) => {
    const newTask = { task, id: getId() };
    todos.push(newTask);
    return newTask;
};

// Updated todo, or null
module.exports.update = (id, changes) => {
    const task = todos.find((task) => task.id === id);
    if (!task) return null;
    task.task = changes;
    return { ...task };
};

// true if deleted, false if found
module.exports.destroy = (id) => {
    const taskIndex = todos.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
        return false;
    }
    todos.splice(taskIndex, 1);
    return true;
};