const Post = require('./post');

class PostRepository {
    constructor(knex) {
        this.knex = knex
    }

    async getAllPost() {
        let results = await this.knex.select('posts.*','category.name').from('posts').join('category', {'category.id': 'posts.id_category'});
        return results.map(result => new Post(result.id,result.title,result.name, result.view, result.created_at));
    }
}
module.exports = PostRepository;