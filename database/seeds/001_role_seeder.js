
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('role').del()
    .then(function () {
      // Inserts seed entries
      return knex('role').insert([
        {type:1,description:"user"},
        {type:2,description:"admin"},
        {type:3,description:"super admin"}
      ]);
    });
};
