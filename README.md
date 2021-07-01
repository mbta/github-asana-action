# `github-asana-action`

This action integrates Asana with GitHub.

### Prerequisites

-   Asana account personal access token, with permissions to write to the relevant project(s)
-   Task URL provided in the PR description, appropriately formatted (see below)

## Inputs

### `asana-pat`

**Required** Your personal access token for Asana, you can create one [here](https://developers.asana.com/docs/#authentication-basics).

### `trigger-phrase`

**Required** Prefix before the task e.g. Asana Task: https://app.asana.com/1/2/3/. For special characters in the trigger phrase refer to the examples.

### `target-section`

**Optional** If provided, attempts to move the task into the given section for each of the projects the task is associated with.

### `task-comment`

**Optional** If any comment is provided, the action will add a comment to the specified Asana task with the text and also append the pull request URL.

### `mark-complete`

**Optional** If set to `true`, the action will mark the specified Asana task as complete.

## Sample PR Description

`Asana Task: https://app.asana.com/0/1/2`

## Examples

#### Without special characters:

```yaml
uses: curai/github-asana-action@v3.1.0
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "Asana Task:"
    target-section: "Done"
    mark-complete: true
```

#### With special characters:

```yaml
uses: curai/github-asana-action@v3.1.0
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "\\*\\*Asana Task:\\*\\*"
    target-section: "Done"
```
