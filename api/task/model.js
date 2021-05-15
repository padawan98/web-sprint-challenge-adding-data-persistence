// build your `Task` model here
const db = require('../../data/dbConfig');

function getTasks ()
{
    return db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_description', 'p.project_name')
        .then(data =>{
            return data.map(taskData=>{
                return{
                    ...taskData,
                    task_completed: taskData.task_completed ? true:false
                }
            })
        })
}

async function postTasks(tasks) 
{
    const [task_id] = await db('tasks').insert(tasks);
    return getTasks().where({task_id}).first()
    .then(data =>{
        return data.map(taskData=>{
            return{
                ...taskData,
                task_completed: taskData.task_completed ? true:false
            }
        })
    })
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