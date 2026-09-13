# AGENTS

## Purpose

- Existing implementations are preserved as learning history.
- Improvements may be added when better approaches are discovered.

## Project Structure

- Application source code, libraries, and tests are located under the `/packages` directory.

## Architecture

- This repository uses the pnpm workspace format, enabling the independent creation and execution of multiple packages
  based on learning objectives.
- Tools such as formatters, linters, and test runners are configured at the workspace root.
- Shared code is created as a separate project and referenced by other packages.
- Samples requiring incompatible dependencies or configurations are created as separate projects.

## Design Principles

- Use English for all source code, comments, and documentation.
- Preserve existing conventions.
- Prefer simple implementations.
- Prefer current language features when they improve readability or maintainability.

## Workflow

- Keep diffs minimal and reviewable.
- For complex, ambiguous, or high-impact tasks, align on the approach before making substantial changes.
- Do not add or update dependencies without confirmation.
- Ask before breaking changes.
- Validate changes after editing.

## Boundaries

- Do not create pull requests or perform remote repository operations unless instructed.

## References

Consult the relevant instruction or skill for language-specific rules, documentation, testing, or repository-specific workflows.
