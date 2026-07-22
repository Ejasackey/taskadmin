Feature: Task Management
  As a user
  I want to create, list, edit, and delete tasks
  So that I can keep track of my work

  Scenario: Date inputs default to today
    Given I am on the task management page
    Then the start date should be today
    And the due date should be today

  Scenario: Create a new task
    Given I am on the task management page
    When I enter a task title "Buy groceries"
    And I submit the task form
    Then I should see "Buy groceries" in the task list

  Scenario: Create a task with dates
    Given I am on the task management page
    When I enter a task title "Buy groceries"
    And I set the start date to "2026-07-17"
    And I set the due date to "2026-07-20"
    And I submit the task form
    Then I should see "Buy groceries" in the task list
    And I should see "Start: 2026-07-17"
    And I should see "Due: 2026-07-20"

  Scenario: List all tasks
    Given I have the following tasks:
      | title          | startDate  | dueDate    |
      | Buy groceries  | 2026-07-17 | 2026-07-20 |
      | Write report   |            | 2026-08-01 |
      | Call dentist   |            |            |
    When I view the task list
    Then I should see 3 tasks
    And I should see "Buy groceries"
    And I should see "Write report"
    And I should see "Call dentist"

  Scenario: Edit a task
    Given I have the following tasks:
      | title          | startDate  | dueDate    |
      | Buy groceries  | 2026-07-17 | 2026-07-20 |
      | Write report   |            |            |
    When I edit the task "Buy groceries" to "Buy groceries and milk" with start date "2026-07-18" and due date "2026-07-21"
    Then I should see "Buy groceries and milk"
    And I should see "Start: 2026-07-18"
    And I should see "Due: 2026-07-21"
    And I should not see "Buy groceries" (as an unedited entry)

  Scenario: Delete a task
    Given I have the following tasks:
      | title          |
      | Buy groceries  |
      | Write report   |
    When I click delete on the task "Buy groceries"
    And I confirm the deletion
    Then I should see 1 task
    And I should see "Write report"
    And I should not see "Buy groceries"

  Scenario: Cancel delete keeps the task
    Given I have the following tasks:
      | title          |
      | Buy groceries  |
      | Write report   |
    When I click delete on the task "Buy groceries"
    And I cancel the deletion
    Then I should see 2 tasks
    And I should see "Buy groceries"
    And I should see "Write report"
