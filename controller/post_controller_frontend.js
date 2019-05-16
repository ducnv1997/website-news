class PostControllerFrontend {
    async index (context) {
        let posts = await context.postRepository.getAllPost();
        let categories = await context.categoryRepository.getAllCategory();

        let postsMostView = [];
        for(let i=0 ; i < categories.length; i++){
            let post = await context.postRepository.getPostMostViewByCategory(categories[i].id);
            postsMostView.push(post[0]);
        }
        context.render('frontend/index.njk.html', {posts, categories, postsMostView});
    }

    async contentPost(context) {
        let post = await context.postRepository.getDataPostById(context.query.id);
        let views = await context.postRepository.increaseView(context.query.id  ,post[0].view);
        let categories = await context.categoryRepository.getAllCategory();
        let postsMostView = [];
        for(let i=0 ; i < categories.length; i++){
            let post = await context.postRepository.getPostMostViewByCategory(categories[i].id);
            postsMostView.push(post[0]);
        }
        context.render('frontend/contentpost.njk.html', {post, categories, views, postsMostView});
    }
}
module.exports = PostControllerFrontend;