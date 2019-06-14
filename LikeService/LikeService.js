const Like = require('./like');

class LikeService {

    constructor(knex) {
        this.knex = knex;
    }

    async like(idPost, idUser) {
        return await this.knex('likes').insert({
            id_post     : idPost,
            id_user     : idUser
        })
    }

    async unLike (id) {
        return this.knex('likes').where('id', '=', id).del();
        
    }

    async checkLike(idPost, idUser) {
        return  await this.knex.select('*').from('likes').where({
            'id_post'   :idPost,
            'id_user'   : idUser
        });
    }

    async getAllLikeByPost(idPost) {
         return await this.knex.select('likes.*', 'users.fullname').from('likes').join('users', {'users.id': 'likes.id_user'}).where('id_post','=',idPost);
    }
}

module.exports = LikeService