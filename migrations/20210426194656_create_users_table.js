
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments('user_id')
    table.string('email').notNullable()
    table.string('username').notNullable()
    table.password('password').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("Users")
};
