
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('role', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('type').notNullable();
      table.string('description',255);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());   
    })
};
  
exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('role');
  
};