# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
The 3 specific design decisions in the API that make it restful are: 

1. Endpoint URLs describe resources, not actions. We use plural nouns(`/api/todos`, `/api/todos/:id`) instead of verbs (`/api/getTask`, `/api/createTask`) for endpoint URLs. This tells the client that the API is focused on resources(todos) and not a specific action. The action is handled by the HTTP method.

2. HTTP methods help us indicate our desired action. The methods include - `GET`: Retrieve data, `POST`: Create data, `PUT/PATCH`: Update data, `DELETE`: Remove data. This tells the client developer that the same URL can be used for different operations depending on the method.

3. Status codes communicate the result of the request. The API uses HTTP status codes like `200 OK`: request was successful, `201 Created`: new resource was created, `404 Not Found`: resource doesn’t exist. This tells the client whether the request worked or failed, and why.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:
Mixing data logic and request/responses logic in one file makes the code harder to read, debug, and maintain. Changes to one part, like data handling, can break API routes. Separating them into a **model** and a **controller** makes them more organized. The model handles data, while the controllers handle requests and responses. 

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:
When a user clicks a checkbox:

1. In `todoControllers.js`, the update function receives the request, gets the `id` and new `isDone` value, and calls the model.

2. In `todoModel.js`, the update function finds the todo by `id` and updates its `isDone` field.

3. The controller sends back a response.

4. The frontend receives the response and updates the UI (checkbox).

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:
1. Controller – It reads req.body, which is part of handling the incoming request.

2. Controller – It validates input and sends a 400 status if the request is invalid.

3. Model – It creates the new todo object, which is part of managing data.

4. Model – It stores the todo (todos.push), which is direct data manipulation.

5. Controller – It sends a response (201 Created) back to the client.