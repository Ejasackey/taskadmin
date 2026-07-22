---
name: new-feature-workflow
description: Guided workflow for creating new features with user stories, specs, build, run, and tests
---

## Workflow

Follow these steps in order when creating a new feature:

### 1. Create a branch
Create a new Git branch from `main` for the feature. Use a descriptive name following conventional commits (e.g., `feat/add-delete-confirmation`).

### 2. Review existing user stories
Read all Gherkin-style user stories in the `/specs` folder (look for `*.feature` files). Understand the existing scenarios and data model.

### 3. Choose or create a user story
- If the feature extends existing behavior, **modify** the relevant `.feature` file in `/specs`.
- If it is an entirely new feature, **generate** a new `.feature` file in `/specs` with the `.feature` extension.
- Write scenarios in Gherkin syntax (Feature, Scenario, Given/When/Then).

### 4. Generate technical specification
Based on the user story, write a technical specification covering:
- Overview
- Data model changes
- UI layout changes
- Behavior details
- Acceptance criteria table
- Test coverage table

Save it in `/specs` as `spec.md`.

### 5. Ask the user to review
Present the user story (`.feature`) and technical specification (`spec.md`) to the user. Wait for explicit approval before proceeding.

### 6. Build
Implement the feature in the codebase. Follow existing code conventions and patterns. Do not add comments unless asked.

### 7. Run
Start the server and verify the feature works manually if applicable.

### 8. Create tests
Write end-to-end tests in `/tests` based on the user story scenarios. Each scenario should have a corresponding test. Run the full test suite to confirm all tests pass.
