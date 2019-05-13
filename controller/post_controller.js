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
        // console.log('123');
       console.log(context.request.body.content)
        // let abc = kq.replace(/(<([^>]+)>)/ig,"");
        let kq = context.request.body.content;
        console.log( kq)
        context.render('test.njk.html', {kq})
    }
}
module.exports = PostController;