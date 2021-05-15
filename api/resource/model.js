// build your `Resource` model here
const db = require('../../data/dbConfig');

//GET
function getResources () 
{
    return db('resources as r')
        .select('r.resource_id', 'r.resource_name', 'r.resource_description');
}

// - Example of response body: 
// `[{"resource_id":1,
// "resource_name":"foo","resource_description":null}]`

//POST
async function postResources (rss) 
{
    const [resource_id] = await db('resources').insert(rss);
    return getResources().where({resource_id}).first();
}

// - Example of response body: 
// `{"resource_id":1,
// "resource_name":"foo","resource_description":null}`


module.exports = {
    getResources,
    postResources,
};