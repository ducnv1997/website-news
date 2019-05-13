
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { id_category:1,
          id_user    :2,
          title      :'Cận cảnh 10 hecta rừng thông chết đứng vì bị đầu độc ở Lâm Đồng',
          content    : "bai post demo 1"
        },
        { id_category:3,
          id_user    :2,
          title      :"Hương Tràm: Từ ca sĩ chuyên ăn phạt vì mặc hở hang đến người đẹp sexy khó ai chê",
          content    : "bai post demo 2"
        },
      ]);
    });
};
