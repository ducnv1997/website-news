class PostController {

    async index(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let posts = await context.postRepository.getAllPost();
        // console.log(posts);
        context.render('post.njk.html', {posts});
    }

    async addPost(context) {
        if(!context.authentication.checkSessionLogined()) {
            return context.redirect('/admin');
        }
        let categories = await context.categoryRepository.getAllCategory();
        context.render('addpost.njk.html', {categories});
    }

    async handleAddPost(context) {
        console.log('123');
        let kq = context.request.body
        context.render('test.njk.html', {kq})
    }
}
module.exports = PostController;