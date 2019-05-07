
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('posts', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('id_category').unsigned();
        table.integer('id_user').unsigned();
        table.string('title',255).notNullable();
        table.text('content');
        table.integer('view');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    
    })
    .table('posts', function (table) {
        table.foreign('id_category').references('category.id');
        table.foreign('id_user').references('users.id');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('posts');

};
