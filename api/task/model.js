// build your `Task` model here
const db = require('../../data/dbConfig');

function getTasks ()
{
    return db('tasks as t')
        .leftJoin('project as p', 'p.project_name', 'p.project_description')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed');
}

async function postTasks(tasks) 
{
    const [project_id] = await db('tasks').insert(tasks);
    return getTasks().where({project_id}).first();
}

// [ ] `[POST] /api/tasks`
// - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
// - Example of response body: `{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`

// - [ ] `[GET] /api/tasks`
// - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
// - Each task must include `project_name` and `project_description`
// - Example of response body: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`

module.exports = {
    getTasks,
    postTasks,
}