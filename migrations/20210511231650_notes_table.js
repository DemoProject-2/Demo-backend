
exports.up = function(knex) {
    return knex.schema.createTable('notes', function(table){
        table.increments('notes_id').unsigned().primary()
        table.string('content')
        table.foreign('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('notes')
};
