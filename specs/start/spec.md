# Task Management — Technical Specification

## 1. Overview

A single-page task manager using **vanilla HTML, CSS, and JavaScript**. No frameworks, no backend, no external dependencies. All data lives in memory.

## 2. Data Model

```js
// In-memory array
let tasks = [];

// Each task
{
  id: Date.now() + Math.random(),  // simple unique ID
  title: string (1–200 chars, required)
}
```

## 3. File Structure

```
index.html   — contains all HTML, CSS (in <style>), and JS (in <script>)
```

A single self-contained file. No build step, no server required.

## 4. UI Layout

```
+------------------------------------------+
|  Task Manager                             |
+------------------------------------------+
|  [________________________] [Add Task]   |
+------------------------------------------+
|  • Buy groceries                          |
|  • Write report                           |
|  • Call dentist                           |
+------------------------------------------+
```

- A heading "Task Manager"
- A text input + "Add Task" button
- An unordered list (`<ul>`) of tasks below
- Empty state: show "No tasks yet" when list is empty

## 5. Behavior

### Create
- User types a title and clicks "Add Task" (or presses Enter)
- If input is empty or whitespace-only, do nothing
- Otherwise, create a task object `{ id: Date.now(), title: value }`, push to array, re-render list, clear input

### List
- On page load, render all tasks from the in-memory array
- Each task is displayed as a `<li>` with its title

## 6. Acceptance Criteria

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Create a new task | Page is loaded | User types a title and clicks Add or presses Enter | Task appears in the list below |
| 2 | List all tasks | Multiple tasks exist in memory | User views the page | All tasks are displayed as list items |
