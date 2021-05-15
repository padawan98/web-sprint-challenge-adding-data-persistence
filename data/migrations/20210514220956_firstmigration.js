
exports.up = async function(knex) {
    await knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id')
        tbl.string('project_name', 15).notNullable()
        tbl.string('project_description')
        tbl.bool('project_completed')
    })
  .createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.string('resource_name', 15).notNullable().unique()
        tbl.string('resource_description')
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.string('task_description').notNullable()
        tbl.string('task_notes')
        tbl.bool('task_completed')
        tbl.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
    })
};


exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
