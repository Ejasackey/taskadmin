Feature: Task Management
  As a user
  I want to create, list, and delete tasks
  So that I can keep track of my work

  Scenario: Create a new task
    Given I am on the task management page
    When I enter a task title "Buy groceries"
    And I submit the task form
    Then I should see "Buy groceries" in the task list

  Scenario: List all tasks
    Given I have the following tasks:
      | title          |
      | Buy groceries  |
      | Write report   |
      | Call dentist   |
    When I view the task list
    Then I should see 3 tasks
    And I should see "Buy groceries"
    And I should see "Write report"
    And I should see "Call dentist"

  Scenario: Delete a task
    Given I have the following tasks:
      | title          |
      | Buy groceries  |
      | Write report   |
    When I delete the task "Buy groceries"
    Then I should see 1 task
    And I should see "Write report"
    And I should not see "Buy groceries"
