class PostController {

    async index(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let posts = await context.postRepository.getAllPost();
        context.render('post.njk.html', {posts});
    }
    async getImages(context) {
        context.body  = await context.image.readImages();
        
    }
    async uploadImages(context) {
        if(!context.req.files[0]){
            context.message = "Upload fail";
        }else{
            context.render('addpost.njk.html');
        }

    }
    async deleteImage(context) {
        let path ="view/" + context.request.body.url_del
        context.image.deleteImage(path);
        context.redirect('/files');
    }

    async addPost(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let categories = await context.categoryRepository.getAllCategory();
        context.render('addpost.njk.html', {categories});
    }

    async handleAddPost(context) {
        await context.postRepository.addPost(context.req, context.session.logined);
        context.redirect('/post');
    }

    async deletePost(context) {
        context.response.body = await context.postRepository.deletePostById(context.request.body.id);
    }

    async editPost(context) {
        let dataPost = await context.postRepository.getPostById(context.query.id);
        let categories = await context.categoryRepository.getAllCategory();
        context.render('editpost.njk.html', { categories,dataPost });
        context.session.idpost = context.query.id;
    }

    async handleEditPost(context) {
        await context.postRepository.editPostBy(context.session.idpost, context.request.body)
        context.redirect('/post');
    }
}
module.exports = PostController;