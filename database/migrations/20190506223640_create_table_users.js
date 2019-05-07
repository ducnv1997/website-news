
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('fullname', 255).notNullable();
      table.string('address',255);
      table.string('email',255).notNullable();
      table.integer('id_role').unsigned();
      table.string('username',255).notNullable();
      table.string('password',255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());  
      table.unique(['username', 'email'])
    })
    .table('users', function (table) {
      table.foreign('id_role').references('role.id');
    })
    
};
  
exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users');
  
};
  