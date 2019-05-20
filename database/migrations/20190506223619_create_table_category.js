
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('category', function (table) {
        table.increments('id').unsigned().primary();
        table.string('name', 255).collate('utf8_unicode_ci').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now()); 
    })
    .alterTable('category', function(table) {
        table.unique(['name']);
      })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('category');
};
