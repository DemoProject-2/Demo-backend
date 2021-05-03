
exports.up = function(knex) {
  return knex.schema.createTable('patients', function(table){
      table.integer('patient_id').unique()
      table.foreign('patient_id').onDelete('CASCADE').references('user_id').inTable('users')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('specialty_needs')
      table.string('primary_insurance').references('insurance_name').inTable('insurance')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Patients')
};
