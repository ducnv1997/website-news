class CategoryControllerFrontend {
    async index(context) {

        let limit           = 3;
        let currentPage     = context.query.page ? context.query.page : 1;
        let offset          = await context.controllerMiddleware.calculateOffset(limit, currentPage);
        let totalPost       = await context.postRepository.countPostByCategory(context.query.id);
        let totalPage       = await context.controllerMiddleware.calculateTotalPage(limit, totalPost);

        let posts = await context.postRepository.getDataPostByCategory(context.query.id, limit, offset);
        let categories = await context.categoryRepository.getAllCategory();
        let postsMostView = await context.postRepository.getPostMostView();
        context.render('frontend/category.njk.html', {posts, categories, postsMostView, totalPage, currentPage});
    }
}

module.exports = CategoryControllerFrontend;