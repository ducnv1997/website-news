class PostController {

    async index(context) {
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
        let categories = await context.categoryRepository.getAllCategory();
        context.render('addpost.njk.html', {categories});
    }

    async handleAddPost(context) {
        let bodyRequest = context.req.body;
        if (context.req.file) {
            let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([bodyRequest.title, bodyRequest.cattegory, bodyRequest.description, bodyRequest.content, context.req.file.path]);

            if(checkEmpty){
                context.alert(checkEmpty);
            }else{
                await context.postRepository.addPost(context.req, context.session.logined);
            }
        }else{
             context.alert("you can choice images avater post")
        }
        return context.redirect('/admin/post');

    }

    async deletePost(context) {
        context.response.body = await context.postRepository.deletePostById(context.request.body.id);
    }

    async editPost(context) {
        let dataPost = await context.postRepository.getDataPostById(context.query.id);
        let categories = await context.categoryRepository.getAllCategory();
        context.render('editpost.njk.html', { categories,dataPost });
        context.session.idpost = context.query.id;
    }

    async handleEditPost(context) {
        await context.postRepository.editPostById(context.session.idpost, context.request.body)
        context.redirect('/admin/post');
    }
}
module.exports = PostController;