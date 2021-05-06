
// exports.up = function(knex) {
//   return knex.schema.createTable('insurance', function(table){
//     table.integer('insurance_id').unique()
//     table.foreign('indurance_id').onDelete('CASCADE').references('user_id').inTable('users')
//     table.string('insurance_name').notNullable()
//     table.string('doctors')
//     table.foreign('doctors').references('doctor_name').inTable('doctors')
//   })
// };

// exports.down = function(knex) {
//   return knex.schema.dropTable('Insurance')
// };

