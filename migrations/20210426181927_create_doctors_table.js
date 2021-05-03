
exports.up = function(knex) {
  return knex.schema.createTable('doctors', function(table){
    table.integer('doctor_id').unique()
    table.foreign('doctor_id').onDelete('CASCADE').references('user_id').inTable('users')
    table.string('doctor_name')
    table.string('address')
    table.string('specialty')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Doctors')
};
