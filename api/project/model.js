// build your `Project` model here
const db = require('../../data/dbConfig');

function getProjects ()
{
    return db('projects as p')
        .select('p.project_id', 'p.project_name', 'p.project_description', 'p.project_completed');
}

async function postProjects(projects) {
    const [project_id] = await db('projects').insert(projects);
    return getProjects().where({project_id}).first();
}


// - [ ] `[GET] /api/projects`
//   - Even though `project_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `[{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]`
module.exports = {
    getProjects,
    postProjects,
}