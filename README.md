# `github-asana-action`

This action integrates Asana with GitHub.

### Prerequisites

-   Asana account with the permission on the particular project you want to integrate with.
-   Must provide the task url in the PR description.

## Inputs

### `asana-pat`

**Required** Your public access token of asana, you can find it in [asana docs](https://developers.asana.com/docs/#authentication-basics).

### `trigger-phrase`

**Required** Prefix before the task i.e ASANA TASK: https://app.asana.com/1/2/3/. For special characters in the trigger phrase refer to the examples.

### `target-section`

**Optional** If provided, attempts to move the task into the given section for each of the projects the task is associated with.

### `task-comment`

**Optional** If any comment is provided, the action will add a comment to the specified asana task with the text & pull request link.

## Sample PR Description

`**Asana Task:** [Task Name](https://app.asana.com/0/1/2)`

## Examples

#### Without special characters:

```yaml
uses: insurify/github-asana-action@v1.0.1
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "Asana Task:"
    targets: '[{"project": "Backlog", "section": "Development Done"}, {"project": "Current Sprint", "section": "In Review"}]'
```

#### With special characters:

```yaml
uses: insurify/github-asana-action@v1.0.1
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "\\*\\*Asana Task:\\*\\*"
    targets: '[{"project": "Backlog", "section": "Development Done"}, {"project": "Current Sprint", "section": "In Review"}]'
```
