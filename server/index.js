const express = require('express');
const path = require('path');
const { takeCoverage } = require('v8');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const listTodos = (req, res) => {
  res.send(todos);
};
app.get('/api/todos', listTodos);


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
const singleTask = (req, res) => {
  const { id } = req.params;
  const task = todos.find(task => task.id === Number(id));

  if (!id) {
    res.status(404).send({
      message: `No task with the id ${id}`
    });
  }
  res.send(task);
};
app.get('/api/todos/:id', singleTask);


// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body
const createTask = (req, res) => {
  const { taskName } = req.body;

  if (!taskName) {
    return res.status(400).send({
      message: 'Invalid Task Name'
    });
  }

  const newTask = { taskName, id: getId() };
  res.send(todos.push(newTask));
};

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
