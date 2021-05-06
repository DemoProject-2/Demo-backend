//creates the specialists table in the database
exports.up = function(knex) {
    return knex.schema.createTable('specialists', function(table){
        table.increments('specialist_id').primary();
        table.string('email').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('specialty').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('professionals')
};
