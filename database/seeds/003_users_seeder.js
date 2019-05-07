
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { fullname:"tran van linh",
          address :"ha noi",
          email   :"test@gmail.com",
          id_role :2,
          username :"test@gmail.com",
          password :123456
        },
        { fullname:"nguyen van duc",
          address :"ha noi",
          email   :"test2@gmail.com",
          id_role :2,
          username :"test2@gmail.com",
          password :123456
        },
      ]);
    });
};
