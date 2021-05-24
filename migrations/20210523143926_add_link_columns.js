
exports.up = function(knex) {
    table.foreign('patient_id').references('id').inTable('users').onDelete('CASCADE')
    table.foreign('specialist_id').references('id').inTable('users').onDelete('CASCADE')
};

exports.down = function(knex) {
  table.dropColumn('patient_id')
  table.dropColumn('specialists_id')
};
