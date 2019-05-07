
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id_category:1,id_user:1,title:"bai viet demo",content:"content demo"},
      ]);
    });
};

