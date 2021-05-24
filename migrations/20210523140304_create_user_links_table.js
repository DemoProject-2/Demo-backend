
exports.up = function(knex) {
    return knex.schema.createTable('links', function(table){
        table.increments('link_id')
        table.integer('patient_id')
        table.integer('specialist_id')
        table.foreign('patient_id').references('id').inTable('users').onDelete('CASCADE')
        table.foreign('specialist_id').references('id').inTable('users').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('links')
};
