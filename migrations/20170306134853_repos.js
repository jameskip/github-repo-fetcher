
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('repos', table => {
      table.increments('id').primary();
      table.string('username');
      table.string('reponame');
      table.integer('stargazers');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('repos')
  ])
};
