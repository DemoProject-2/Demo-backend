
exports.up = function(knex) {
  return knex.schema.createTable('NormalUser', function(table){
    table.increments('user_id')
    table.string('first_name')
    table.string('last_name')
    table.string('user_name').notNullable()
    table.string('email').notNullable()
    table.password('password').notNullable()
    table.string('medical_issue')
    table.string('acct_type')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("Users")
};
