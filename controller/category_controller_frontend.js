class CategoryControllerFrontend {
    async index (context) {
        let posts =  await context.postRepository.getDataPostByCategory(context.query.id);
        let categories = await context.categoryRepository.getAllCategory();
        let postsMostView = [];
        for(let i=0 ; i < categories.length; i++){
            let post = await context.postRepository.getPostMostViewByCategory(categories[i].id);
            postsMostView.push(post[0]);
        }
        context.render('frontend/category.njk.html', {posts, categories, postsMostView});       
    }
}
module.exports = CategoryControllerFrontend;