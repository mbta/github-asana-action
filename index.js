const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

/**
 * @param {string} asanaPAT The Asana "Personal Access Token" (PAT) used to access the Asana API.
 * @param {any} taskId The ID of the Asana Task to act on.
 * @param {string | null} targetSection Optional name of the Asana Board Section to move the {@link taskId Asana Task} to.
 * @param {string | null} taskComment Optional comment to add to the {@link taskId Asana Task}
 * @param {boolean} markComplete Whether to mark the {@link taskId Asana Task} as completed.
 */
async function asanaOperations(
    asanaPAT,
    targetSection,
    taskId,
    taskComment,
    markComplete,
) {
    try {
        const client = asana.Client.create({
            defaultHeaders: { "Asana-Enable": "new_user_task_lists" },
        }).useAccessToken(asanaPAT);

        const task = await client.tasks.findById(taskId);

        if (targetSection) {
            task.projects.forEach(async (project) => {
                let foundTargetSection = await client.sections
                    .findByProject(project.gid)
                    .then((sections) =>
                        sections.find(
                            (section) => section.name === targetSection,
                        ),
                    );
                if (foundTargetSection) {
                    await client.sections.addTask(foundTargetSection.gid, {
                        task: taskId,
                    });
                    core.info(
                        `Moved task ${taskId} to: ${project.name}/${targetSection}`,
                    );
                } else {
                    core.warning(`Asana section ${targetSection} not found.`);
                }
            });
        }

        if (taskComment) {
            await client.tasks.addComment(taskId, {
                text: taskComment,
            });
            core.info(`Added PR link to task ${taskId}.`);
        }

        if (markComplete) {
            await client.tasks.update(taskId, {
                completed: true,
            });
            core.info(`Task ${taskId} marked as complete.`);
        }
    } catch (error) {
        if (typeof error === "string") {
            error = new Error(error);
        }
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed(`Unknown error: ${error}`);
        }
    }
}

try {
    const ASANA_PAT = core.getInput("asana-pat"),
        TARGET_SECTION = core.getInput("target-section"),
        TRIGGER_PHRASE = core.getInput("trigger-phrase"),
        TASK_COMMENT = core.getInput("task-comment"),
        MARK_COMPLETE = core.getBooleanInput("mark-complete"),
        PULL_REQUEST = github.context.payload.pull_request,
        REGEX = new RegExp(
            `${TRIGGER_PHRASE}(\\s)*(?:\\[.*\\]\\()?https:\\/\\/app.asana.com(\\/.*\\/)+task\\/(?<task>\\d+).*?`,
            "g",
        );
    core.info("Beginning run with:");
    core.info(`Trigger phrase: "${TRIGGER_PHRASE}"`);
    core.info(`Target section: ${TARGET_SECTION}`);
    core.info(`Task comment: "${TASK_COMMENT}"`);
    core.info(`Mark complete: "${MARK_COMPLETE}"`);
    core.info(`PR body: ${PULL_REQUEST?.body}`);
    let taskComment = null;

    if (!ASANA_PAT) {
        throw { message: "Asana PAT not found!" };
    }
    if (TASK_COMMENT) {
        taskComment = `${TASK_COMMENT} ${PULL_REQUEST?.html_url}`;
    }

    const foundAsanaURLs = [...(PULL_REQUEST?.body?.matchAll(REGEX) || [])];

    if (foundAsanaURLs.length === 0) {
        core.debug("0 Asana URLs found matching the `trigger-phrase`.");
    }

    for (const parseAsanaURL of foundAsanaURLs) {
        let taskId = parseAsanaURL?.groups?.task;
        if (taskId) {
            core.info(`Handling Asana task ID: ${taskId}`);
            asanaOperations(
                ASANA_PAT,
                TARGET_SECTION,
                taskId,
                taskComment,
                MARK_COMPLETE,
            );
        } else {
            core.info(
                `Invalid Asana task URL after trigger phrase ${TRIGGER_PHRASE}`,
            );
        }
    }
} catch (error) {
    if (typeof error === "string") {
        error = new Error(error);
    }
    if (error instanceof Error) {
        core.setFailed(error.message);
    } else {
        core.setFailed(`Unknown error: ${error}`);
    }
}
