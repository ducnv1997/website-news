
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('token', function (table) {
        table.increments('id').unsigned().primary();
        table.string('token',255).notNullable(); 
    })
    .alterTable('token', function(table) {
        table.unique(['token']);
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('token');

};
