
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { fullname:"nguyen van duc",
          address :"ha noi",
          email   :"test2@gmail.com",
          id_role :2,
          username :"test2@gmail.com",
          password :"$2b$08$X1UkamwGSSJzepVWmBNPGOOvRbiCqM9CeUSM5U2lhFeF0Iuq5H7q."
        },
        { fullname:"super admin",
          address :"ha noi",
          email   :"admin@gmail.com",
          id_role :3,
          username :"admin@gmail.com",
          password :"$2b$08$X1UkamwGSSJzepVWmBNPGOOvRbiCqM9CeUSM5U2lhFeF0Iuq5H7q."
        }
      ]);
    });
};
