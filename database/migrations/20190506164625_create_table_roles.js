exports.up = function (knex, Promise) {
    knex.schema.createTableIfNotExists('roles', (table) => {
        table.integer('role_id').increments();
        table.string('name', 100);
        table.string('description')
    });
};
exports.down = function (knex, Promise) {
    knex.schema.dropTableIfExists('roles')
};
