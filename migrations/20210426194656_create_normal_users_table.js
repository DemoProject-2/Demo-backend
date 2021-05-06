
exports.up = function(knex) {
  return knex.schema.createTable('patients', function(table){
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('patients')
};
