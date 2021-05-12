
exports.up = function(knex) {
    return knex.schema.createTable('disorders', function(table){
        table.increments('disorder_id').unsigned().primary()
        table.string('disorder_name')
        table.foreign('user_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('disorders')
};
