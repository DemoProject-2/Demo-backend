
exports.up = function(knex) {
    return knex.schema.createTable('notes', function(table){
        table.increments('notes_id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.string('title')
        table.string('content')
        table.string('note_type')
        table.integer('user_id')
        table.foreign('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('notes')
};
