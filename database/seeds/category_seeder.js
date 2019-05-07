
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {name:"the thao"},
        {name:"thoi trang"},
        {name:"quan su"},
        {name:"giao duc"},
        {name:"y te"},
      ]);
    });
};