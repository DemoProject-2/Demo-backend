//TODO: add more data to table
exports.up = function(knex) {
  return knex.schema.createTable('specialists', function(table){
    table.integer('specialist_id').unsigned().notNullable()
    table.foreign('specialist_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('specialists')
};
