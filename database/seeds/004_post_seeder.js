
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { id_category:1,
          id_user    :2,
          title      :"post demo",
          content    : "bai post demo 1"
        },
        { id_category:3,
          id_user    :2,
          title      :"post demo",
          content    : "bai post demo 1"
        },
      ]);
    });
};
