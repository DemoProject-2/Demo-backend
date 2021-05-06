
exports.up = function(knex) {
  return knex.schema.createTable('specialists', function(table){
    table.integer('specialist_id').unique()
    table.string('first_name')
    table.string('last_name')
    table.string('user_name').notNullable()
    table.string('email').notNullable()
    table.password('password').notNullable()
    table.string('medical_issue')
    table.string('account_type')
    //table.foreign('doctor_id').onDelete('CASCADE').references('user_id').inTable('users')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('specialists')
};
