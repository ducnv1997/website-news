class PostController {

    async index(context) {
        let limit = 3;
        let page = context.request.body.page ? context.request.body.page : 1;
        let start = (limit * page) - limit;
        let posts = "";

        if(page >1) {
             posts = await context.postRepository.getAllPostByPage(limit +1, start);
             return context.response.body = {posts,limit};
        }

        posts = await context.postRepository.getAllPostByPage(limit, start);

        let user      = context.session.logined
        context.render('admin/post.njk.html', {posts, user});
        

    }

    async getImages(context) {
        context.body  = await context.image.readImages();
        
    }
    async uploadImages(context) {
        context.alert('success');
        context.redirect('back');

    }

    async deleteImage(context) {
        let path ="view/" + context.request.body.url_del
        context.image.deleteImage(path);
        context.redirect('/files');
    }

    async addPost(context) {
        let categories = await context.categoryRepository.getAllCategory();
        let user      = context.session.logined
        context.render('admin/addpost.njk.html', {categories, user});
    }

    async handleAddPost(context, next) {
        try {
            await context.postRepository.addPost(context.title, context.idCategory, context.session.logined.id, context.content, context.description, context.pathAvatar);
        } catch (error) {
             context.alert('An error occurred. Please try again later');
        }

        context.idCategory  = null;
        context.content     = null;
        context.description = null;
        context.pathAvatar  = null;
        context.redirect('/admin/post');
        await next();

    }

    async deletePost(context) {
        context.response.body = await context.postRepository.deletePostById(context.request.body.id);
    }

    async editPost(context) {
        let dataPost = await context.postRepository.getDataPostById(context.query.id);
        let categories = await context.categoryRepository.getAllCategory();
        let user      = context.session.logined;
        context.render('admin/editpost.njk.html', { categories, dataPost, user });
        context.session.idpost = context.query.id;
    }

    async handleEditPost(context) {
        await context.postRepository.editPostById(context.session.idpost, context.title, context.idCategory, context.content, context.description);

        context.title           = null;
        context.idCategory      = null;
        context.content         = null;
        context.description     = null;
        context.session.idpost  = null;
        return context.redirect('/admin/post');
    }

    async search(context) {

            let keyword         = context.keyword;
            let posts =  await context.postRepository.searchPostOrUserByKeyword(keyword);
            let user      = context.session.logined

            context.render('admin/search.njk.html', {posts, user});
            context.keyword = null;
    }

   
}
module.exports = PostController;