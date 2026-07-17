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
  title: string (1–200 chars, required),
  startDate: string (YYYY-MM-DD, optional),
  dueDate: string (YYYY-MM-DD, optional)
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
|  [_____________________________]         |
|  Start: [____] Due: [____] [Add] [Cancel]|
+------------------------------------------+
|  • Buy groceries              [✎] [✕]   |
|    Start: 2026-07-17 | Due: 2026-07-20  |
|  • Write report               [✎] [✕]   |
|  • Call dentist               [✎] [✕]   |
|    Due: 2026-08-01                       |
+------------------------------------------+
```

- A heading "Task Manager"
- A text input for the task title
- Start date and due date inputs (date pickers)
- "Add Task" button (Cancel button visible only during editing)
- An unordered list (`<ul>`) of tasks below, with optional date info shown below each title
- Empty state: show "No tasks yet" when list is empty

## 5. Behavior

### Create
- User types a title, optionally picks a start date and/or due date, and clicks "Add Task" (or presses Enter)
- If title is empty or whitespace-only, do nothing
- Otherwise, create a task object `{ id: Date.now(), title: value, startDate, dueDate }`, push to array, re-render list, clear inputs

### List
- On page load, render all tasks from the in-memory array
- Each task is displayed as a `<li>` with its title and optionally the start/due dates below it
- Each task row has edit (✎) and delete (✕) buttons

### Edit
- Each task row has an edit button (✎)
- Clicking it loads the task title and dates into their respective inputs and changes the button to "Update Task"
- Submitting updates the task (title and dates) in the array, persists to localStorage, and re-renders
- A Cancel button appears during editing; clicking it or pressing Escape cancels the edit
- If the edited task is deleted by another user action during editing, the edit is cancelled

### Delete
- Each task row has a delete button (✕)
- Clicking it removes the task from the array, persists to localStorage, and re-renders the list

## 6. Acceptance Criteria

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Create a new task | Page is loaded | User types a title and clicks Add or presses Enter | Task appears in the list below |
| 2 | Create a task with dates | Page is loaded | User types a title, picks start and due dates, and submits | Task appears with dates shown below the title |
| 3 | List all tasks | Multiple tasks exist in memory | User views the page | All tasks are displayed as list items with their dates |
| 4 | Edit a task | A task exists in the list | User clicks the edit button, modifies title and/or dates, and submits | The task is updated in the list |
| 5 | Delete a task | A task exists in the list | User clicks the delete button on that task | The task is removed from the list |
