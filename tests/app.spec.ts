import { test, expect } from '@playwright/test';

const today = () => new Date().toISOString().slice(0, 10);

test.describe('Task Management', () => {

  test('Date inputs default to today', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#startDate')).toHaveValue(today());
    await expect(page.locator('#dueDate')).toHaveValue(today());
  });

  test('Create a new task', async ({ page }) => {
    await page.goto('/');
    await page.fill('#taskInput', 'Buy groceries');
    await page.click('#addBtn');
    await expect(page.locator('.list-group-item')).toContainText('Buy groceries');
  });

  test('Create a task with a description', async ({ page }) => {
    await page.goto('/');
    await page.fill('#taskInput', 'Buy groceries');
    await page.fill('#taskDescription', 'Milk, eggs, and bread');
    await page.click('#addBtn');
    await expect(page.locator('.list-group-item')).toContainText('Buy groceries');
    await expect(page.locator('.list-group-item')).toContainText('Milk, eggs, and bread');
  });

  test('Create a task with a description and dates', async ({ page }) => {
    await page.goto('/');
    await page.fill('#taskInput', 'Buy groceries');
    await page.fill('#taskDescription', 'Milk, eggs, and bread');
    await page.fill('#startDate', '2026-07-17');
    await page.fill('#dueDate', '2026-07-20');
    await page.click('#addBtn');
    await expect(page.locator('.list-group-item')).toContainText('Buy groceries');
    await expect(page.locator('.list-group-item')).toContainText('Milk, eggs, and bread');
    await expect(page.locator('.list-group-item')).toContainText('Start: 2026-07-17');
    await expect(page.locator('.list-group-item')).toContainText('Due: 2026-07-20');
  });

  test('List all tasks', async ({ page }) => {
    const tasks = [
      { title: 'Buy groceries', description: 'Milk, eggs, bread', startDate: '2026-07-17', dueDate: '2026-07-20' },
      { title: 'Write report', description: '', startDate: '', dueDate: '2026-08-01' },
      { title: 'Call dentist', description: '', startDate: '', dueDate: '' },
    ];
    await page.goto('/');
    await page.evaluate((tasks) => {
      localStorage.setItem('taskmanager_tasks', JSON.stringify(tasks));
    }, tasks);
    await page.reload();

    const items = page.locator('.list-group-item:not(:has(.edit-btn):not(:has(.delete-btn)))');
    const allItems = page.locator('.list-group-item');
    await expect(allItems).toHaveCount(3);
    await expect(page.locator('#taskList')).toContainText('Buy groceries');
    await expect(page.locator('#taskList')).toContainText('Milk, eggs, bread');
    await expect(page.locator('#taskList')).toContainText('Write report');
    await expect(page.locator('#taskList')).toContainText('Call dentist');
  });

  test('Edit a task', async ({ page }) => {
    const tasks = [
      { id: '1', title: 'Buy groceries', description: 'Milk, eggs, bread', startDate: '2026-07-17', dueDate: '2026-07-20' },
      { id: '2', title: 'Write report', description: '', startDate: '', dueDate: '' },
    ];
    await page.goto('/');
    await page.evaluate((tasks) => {
      localStorage.setItem('taskmanager_tasks', JSON.stringify(tasks));
    }, tasks);
    await page.reload();

    await page.click('.edit-btn[data-id="1"]');
    await page.fill('#taskInput', 'Buy groceries and milk');
    await page.fill('#taskDescription', 'Milk, eggs, bread, and butter');
    await page.fill('#startDate', '2026-07-18');
    await page.fill('#dueDate', '2026-07-21');
    await page.click('#addBtn');

    await expect(page.locator('#taskList')).toContainText('Buy groceries and milk');
    await expect(page.locator('#taskList')).toContainText('Milk, eggs, bread, and butter');
    await expect(page.locator('#taskList')).toContainText('Start: 2026-07-18');
    await expect(page.locator('#taskList')).toContainText('Due: 2026-07-21');

    const listText = await page.locator('#taskList').innerText();
    expect(listText).not.toMatch(/^Buy groceries$/m);
  });

  test('Delete a task after confirmation', async ({ page }) => {
    const tasks = [
      { id: '1', title: 'Buy groceries', startDate: '', dueDate: '' },
      { id: '2', title: 'Write report', startDate: '', dueDate: '' },
    ];
    await page.goto('/');
    await page.evaluate((tasks) => {
      localStorage.setItem('taskmanager_tasks', JSON.stringify(tasks));
    }, tasks);
    await page.reload();

    page.on('dialog', dialog => dialog.accept());
    await page.click('.delete-btn[data-id="1"]');

    const regularItems = page.locator('#taskList .list-group-item');
    await expect(regularItems).toHaveCount(1);
    await expect(page.locator('#taskList')).toContainText('Write report');
    const listText = await page.locator('#taskList').innerText();
    expect(listText).not.toContain('Buy groceries');
  });

  test('Cancel delete keeps the task', async ({ page }) => {
    const tasks = [
      { id: '1', title: 'Buy groceries', startDate: '', dueDate: '' },
      { id: '2', title: 'Write report', startDate: '', dueDate: '' },
    ];
    await page.goto('/');
    await page.evaluate((tasks) => {
      localStorage.setItem('taskmanager_tasks', JSON.stringify(tasks));
    }, tasks);
    await page.reload();

    page.on('dialog', dialog => dialog.dismiss());
    await page.click('.delete-btn[data-id="1"]');

    const regularItems = page.locator('#taskList .list-group-item');
    await expect(regularItems).toHaveCount(2);
    await expect(page.locator('#taskList')).toContainText('Buy groceries');
    await expect(page.locator('#taskList')).toContainText('Write report');
  });

  test('Task items are draggable', async ({ page }) => {
    const tasks = [
      { id: '1', title: 'Buy groceries', startDate: '', dueDate: '' },
      { id: '2', title: 'Write report', startDate: '', dueDate: '' },
    ];
    await page.goto('/');
    await page.evaluate((tasks) => {
      localStorage.setItem('taskmanager_tasks', JSON.stringify(tasks));
    }, tasks);
    await page.reload();

    const firstItem = page.locator('.task-item').first();
    await expect(firstItem).toHaveAttribute('draggable', 'true');
  });

  test('Long task titles are truncated', async ({ page }) => {
    await page.goto('/');
    await page.fill('#taskInput', 'This is a very long task title that should be truncated when displayed in the task list');
    await page.click('#addBtn');
    const title = page.locator('.task-title');
    await expect(title).toHaveCSS('text-overflow', 'ellipsis');
  });

});
