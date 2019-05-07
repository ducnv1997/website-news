
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('comment', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('id_post').unsigned();
        table.integer('id_user').unsigned();
        table.text('content')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    
    })
    .table('comment', function (table) {
        table.foreign('id_post').references('posts.id');
        table.foreign('id_user').references('users.id');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('comment');

};
