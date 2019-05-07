
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(() => {
      return knex('posts').del();
    })
    .then(() => {
      return knex('category').del();
    })
    .then(() => {
      return knex('users').del();
    })
    // .then(() => {
    //   return knex('role').del();
    // });
};
