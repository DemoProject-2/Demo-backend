
exports.up = function(knex) {
  return knex.schema.createTable('patients', function(table){
      table.increments('patient_id').primary();
      table.string('email').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('specialty_need');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Patients')
};
