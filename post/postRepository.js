const Post = require('./post');

class PostRepository {
    constructor(knex) {
        this.knex = knex
    }

    async getAllPost() {
        let results = await this.knex.select('posts.*', 'category.name').from('posts').join('category', {'category.id': 'posts.id_category'}).orderBy('posts.created_at', 'desc');

        return results.map(result => new Post(result.id, result.title, result.name, result.description, result.avatar, result.view, result.created_at));
    }

    async getAllPostByPage(limit, ofset) {
        let results = await this.knex.select('posts.*', 'category.name').from('posts').join('category', {'category.id': 'posts.id_category'}).orderBy('posts.created_at', 'desc').limit(limit).offset(ofset);

        return results.map(result => new Post(result.id, result.title, result.name, result.description, result.avatar, result.view, result.created_at));
    }

    async getPostMostView() {
        return await this.knex.select('posts.*', 'category.name')
            .from('posts').join('category', {'category.id': 'posts.id_category'})
            .whereIn('view',
                this.knex.max('view').from('posts').groupBy('id_category')
            )
            .orderBy('view', 'desc');
    }

    async getDataPostById(id) {
        return await this.knex.select('posts.*', 'category.name').from('posts').join('category', {'category.id': 'posts.id_category'}).where('posts.id', '=', id);
    }

    async getDataPostByCategory(idCategory, limit, ofset) {
        return await this.knex.select('posts.*', 'category.name').from('posts').join('category', {'category.id': 'posts.id_category'}).where('posts.id_category', '=', idCategory).orderBy('posts.created_at', 'desc').limit(limit).offset(ofset);
    }

    async increaseView(idPost, view) {
        view += 1;
        await this.knex('posts').where('id', '=', idPost).update({
            view: view,
            thisKeyIsSkipped: undefined
        });
        return view;
    }

    async addPost(dataPost, id) {
        let path = dataPost.file.path
        let newPath = path.replace("view", "..");
        return await this.knex('posts').insert({
            title: dataPost.body.title,
            id_category: dataPost.body.cattegory,
            id_user: id,
            content: dataPost.body.content,
            description: dataPost.body.description,
            avatar: newPath
        });
    }

    async deletePostById(id) {
        return this.knex('posts').where('id', '=', id).del();

    }

    async editPostById(id, dataPost) {
        return await this.knex('posts').where('id', '=', id).update({
            title: dataPost.title,
            description: dataPost.description,
            content: dataPost.content,
            id_category: dataPost.cattegory,
            thisKeyIsSkipped: undefined
        })
    }

    async searchPostByKeyword(keyword, limit, ofset) {
        return await this.knex('posts').where('title', 'like', '%' + keyword + '%').limit(limit).offset(ofset);
    }

    async CountPostByKeyword(keyword) {
        return await this.knex('posts').count('id').where('title', 'like', '%' + keyword + '%');
    }


    async countPost() {
        return this.knex('posts').count('id');
    }

    async countPostByCategory(idCate) {
        return this.knex('posts').count('id').where('id_category','=',idCate)
    }
}

module.exports = PostRepository;