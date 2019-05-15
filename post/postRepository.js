const Post = require('./post');

class PostRepository {
    constructor(knex) {
        this.knex = knex
    }

    async getAllPost() {
        let results = await this.knex.select('posts.*','category.name').from('posts').join('category', {'category.id': 'posts.id_category'});
        return results.map(result => new Post(result.id,result.title,result.name, result.view, result.created_at));
    }

    async getPostById(id) {
        return await this.knex.select('posts.*','category.name').from('posts').join('category', {'category.id': 'posts.id_category'}).where('posts.id','=',id);
    }

    async addPost(dataPost, id) {
        return await this.knex('posts').insert({
            title: dataPost.body.title,
            id_category : dataPost.body.cattegory,
            id_user     : id,
            content     : dataPost.body.content,
            description : dataPost.body.description,
            avatar      : dataPost.file.path
        });
    }

    async deletePostById(id) {
        return this.knex('posts').where('id', '=', id).del();

    }

    async editPostById(id, dataPost) {
        return await this.knex('posts').where('id', '=', id).update({
            title           : dataPost.title,
            description     : dataPost.description,
            content         : dataPost.content,
            id_category     : dataPost.cattegory,
            thisKeyIsSkipped: undefined
        })
        console.log(dataPost);
    } 
}
module.exports = PostRepository;