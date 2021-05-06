//TODO: add more data to table
exports.up = function(knex) {
  return knex.schema.createTable('patients', function(table){
    table.integer('patient_id').unsigned().notNullable()
    table.foreign('patient_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('patients')
};
