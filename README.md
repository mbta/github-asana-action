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
uses: mbta/github-asana-action@v4.3.0
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "Asana Task:"
    target-section: "Done"
    mark-complete: true
```

#### With special characters:

```yaml
uses: mbta/github-asana-action@v4.3.0
with:
    asana-pat: "Your PAT"
    task-comment: "View Pull Request Here: "
    trigger-phrase: "\\*\\*Asana Task:\\*\\*"
    target-section: "Done"
```

# Development

## Requirements
### node
Installing [asdf with asdf-nodejs plugin](https://github.com/asdf-vm/asdf-nodejs) is one option

### [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
After installing node, run `npm install -g yarn`

Finally, run `yarn` in the base of the repository to fetch the dependencies defined in package.json/yarn.lock.

## Formatting
You can format index.js by running `yarn format`

## Building a release
We use vercel/ncc to build this action into a distribution. See [the Github Actions Docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github) for more information.

On your branch,
* Bump the version in package.json
* Run `yarn build`
* Commit the resulting files in `dist/`

After merging to main,
* Add a tag on the main branch
```
git tag -a -m "Adds support for link titles" v<version>
git push --follow-tags
```

After merge to main and pushing the tag, your release should be available as `v<version>`
