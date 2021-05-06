
exports.up = function(knex) {
  return knex.schema.createTable('specialists', function(table){
    table.integer('id').unsigned().primary()
    table.string('first_name')
    table.string('last_name')
    table.string('user_name').notNullable()
    table.string('email').notNullable()
    table.password('password').notNullable()
    table.string('medical_issue')
    table.string('account_type')
    table.integer('user_id').unsigned().notNullable
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('specialists')
};
