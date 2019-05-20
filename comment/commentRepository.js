const Comment = require('./comment');
class CommentRepository{
    constructor(knex) {
        this.knex = knex
    }

    async getAllCommentByPost(idPost) {
        let results = await this.knex.select('comment.*', 'users.username').from('comment').join('users', {'users.id': 'comment.id_user'}).where('id_post','=',idPost).orderBy('comment.created_at', 'desc');  
        
        return results.map(result => new Comment(result.id, result.id_post, result.username, result.content, result.created_at, result.updated_at));
        
    }

    async addComment(content, idUser, idPost){
        return await this.knex('comment').insert({
            id_post: idPost,
            id_user: idUser,
            content: content,
        });
    }

    async deleteComment(id) {
        return this.knex('comment').where('id', '=', id).del();
    }

    async editComment(id, content) {
        return await this.knex('comment').where('id', '=', id).update({
            content: content,
            thisKeyIsSkipped: undefined
        }) 
    }
}

module.exports = CommentRepository