exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('repos', table => {
      table.integer('id').primary();
      table.string('username');
      table.string('reponame');
      table.integer('stargazers');
      table.string('link');
      table.string('ownerLink');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('repos')
  ])
};
