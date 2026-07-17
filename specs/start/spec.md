# Task Management — Technical Specification

## 1. Overview

A single-page task manager using **vanilla HTML, CSS, and JavaScript**. No frameworks, no backend, no external dependencies. All data lives in local storage.

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
|  [________________________] [Add] [Cancel]|
+------------------------------------------+
|  • Buy groceries              [✎] [✕]   |
|  • Write report               [✎] [✕]   |
|  • Call dentist               [✎] [✕]   |
+------------------------------------------+
```

- A heading "Task Manager"
- A text input + "Add Task" button (Cancel button visible only during editing)
- An unordered list (`<ul>`) of tasks below
- Empty state: show "No tasks yet" when list is empty

## 5. Behavior

### Create
- User types a title and clicks "Add Task" (or presses Enter)
- If input is empty or whitespace-only, do nothing
- Otherwise, create a task object `{ id: Date.now(), title: value }`, push to array, re-render list, clear input

### List
- On page load, render all tasks from the in-memory array
- Each task is displayed as a `<li>` with its title and a delete button

### Edit
- Each task row has an edit button (✎)
- Clicking it loads the task title into the input and changes the button to "Update Task"
- Submitting updates the task in the array, persists to localStorage, and re-renders
- A Cancel button appears during editing; clicking it or pressing Escape cancels the edit
- If the edited task is deleted by another user action during editing, the edit is cancelled

### Delete
- Each task row has a delete button (✕)
- Clicking it removes the task from the array, persists to localStorage, and re-renders the list

## 6. Acceptance Criteria

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Create a new task | Page is loaded | User types a title and clicks Add or presses Enter | Task appears in the list below |
| 2 | List all tasks | Multiple tasks exist in memory | User views the page | All tasks are displayed as list items |
| 3 | Edit a task | A task exists in the list | User clicks the edit button on that task, modifies the title, and submits | The task title is updated in the list |
| 4 | Delete a task | A task exists in the list | User clicks the delete button on that task | The task is removed from the list |
