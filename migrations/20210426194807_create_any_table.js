
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
      table.bigIncrements('id')
      table.string('first_name')
      table.string('last_name')
      table.string('user_name').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('medical_issue').notNullable()
      table.string('account_type').notNullable()
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('users')
  };
  