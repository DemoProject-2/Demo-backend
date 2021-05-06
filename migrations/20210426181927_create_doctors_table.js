
exports.up = function(knex) {
  return knex.schema.createTable('Specialists', function(table){
    table.integer('specialist_id').unique()
    table.string('first_name')
    table.string('last_name')
    table.string('user_name').notNullable()
    table.string('email').notNullable()
    table.password('password').notNullable()
    table.string('medical_issue')
    table.string('acct_type')
    //table.foreign('doctor_id').onDelete('CASCADE').references('user_id').inTable('users')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Doctors')
};
