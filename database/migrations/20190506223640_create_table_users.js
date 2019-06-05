
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('fullname', 255).notNullable().collate('utf8_unicode_ci');
      table.string('address',255).collate('utf8_unicode_ci');
      table.string('email',255).notNullable();
      table.integer('id_role').unsigned().defaultTo(1);
      table.string('avatar', 255);
      table.string('username',255).notNullable();
      table.string('password',255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());  
    })
    .alterTable('users', function(table) {
      table.unique(['username']);
      table.unique(['email']);
    })
    .table('users', function (table) {
      table.foreign('id_role').references('role.id').onUpdate('RESTRICT').onDelete('CASCADE');
    })
    
};
  
exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users');
  
};
  