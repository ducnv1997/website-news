
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('posts', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('id_category').unsigned();
        table.integer('id_user').unsigned();
        table.string('title',255).collate('utf8_unicode_ci').notNullable();
        table.string('avatar',255);
        table.string('description',255).collate('utf8_unicode_ci');
        table.text('content').collate('utf8_unicode_ci');
        table.integer('view').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    
    })
    .table('posts', function (table) {
        table.foreign('id_category').references('category.id').onUpdate('RESTRICT').onDelete('CASCADE');
        table.foreign('id_user').references('users.id').onUpdate('RESTRICT').onDelete('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('posts');

};
