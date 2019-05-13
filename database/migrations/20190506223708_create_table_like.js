
exports.up = function(knex, Promise) {
    return knex.schema
      .createTable('likes', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('id_post').unsigned();
        table.integer('id_user').unsigned();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    
      })
      .table('likes', function (table) {
        table.foreign('id_post').references('posts.id').onUpdate('RESTRICT').onDelete('CASCADE');
        table.foreign('id_user').references('users.id').onUpdate('RESTRICT').onDelete('CASCADE');
      })

};
  
exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('likes');
  
};
  
