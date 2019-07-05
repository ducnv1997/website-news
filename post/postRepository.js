const Post = require('./post');

class PostRepository {
    constructor(knex) {
        
        this.knex = knex;
    }

    async getAllPost() {
        let results = await this.knex.select('posts.*', 'category.name', 'users.fullname').from('posts').join('category', {'category.id': 'posts.id_category'}).join('users', {'users.id': 'posts.id_user'}).orderBy('posts.created_at', 'desc');

        return results.map(result => new Post(result.id, result.title, result.name, result.description, result.avatar, result.view, result.created_at, result.fullname));
    }

    async getAllPostByPage(limit, ofset) {
        let results = await this.knex.select('posts.*', 'category.name','users.fullname').from('posts').join('category', {'category.id': 'posts.id_category'}).join('users', {'users.id': 'posts.id_user'}).orderBy('posts.created_at', 'desc').limit(limit).offset(ofset);

        return results.map(result => new Post(result.id, result.title, result.name, result.description, result.avatar, result.view, result.created_at, result.fullname));
    }

    async getPostMostView() {
        let currentDate     = new Date().getDate();
        let timeLastWeek    = new Date();
        timeLastWeek.setDate(currentDate - 7);
        
        return await this.knex.select('posts.*', 'category.name')
            .from('posts').join('category', {'category.id': 'posts.id_category'})
            .whereIn('view',
                this.knex.max('view').from('posts').where('created_at', '>=', timeLastWeek).groupBy('id_category')
            )
            .orderBy('view', 'desc').limit(4);
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

    async addPost(title, idCategory, idUser, content, description, avatarPatth) {
        return await this.knex('posts').insert({
            title: title,
            id_category: idCategory,
            id_user: idUser,
            content: content,
            description: description,
            avatar: avatarPatth
        });
    }

    async deletePostById(id) {
        return this.knex('posts').where('id', '=', id).del();

    }

    async editPostById(id, title, idCategory, content, description,  ) {
        return await this.knex('posts').where('id', '=', id).update({
            title: title,
            description: description,
            content: content,
            id_category:idCategory,
            thisKeyIsSkipped: undefined
        })
    }

    async searchPostByKeyword(keyword, limit, ofset) {
        return await this.knex('posts').where('title', 'like', '%' + keyword + '%').limit(limit).offset(ofset);
    }

    async searchPostOrUserByKeyword(keyword) {
        let results = await this.knex.select('posts.*', 'category.name', 'users.fullname').from('posts').join('users', {'users.id': 'posts.id_user'}).join('category', {'category.id': 'posts.id_category'}).where('title', 'like', '%' + keyword + '%').orWhere('fullname', 'like', '%' + keyword + '%').orderBy('posts.created_at', 'desc');
        return results.map(result => new Post(result.id, result.title, result.name, result.description, result.avatar, result.view, result.created_at, result.fullname));
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