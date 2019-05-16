class CategoryController {


    async index(context) {
        let categorys = await context.categoryRepository.getAllCategory();
        context.render('categoryadmin.njk.html', {categorys});
    }

    async addCategory(context) {
        context.render('addcategory.njk.html');
    }

    async handleAddCategory(context) {
        let nameCategory = context.request.body.nameCategory;
        await context.categoryRepository.addCategory(nameCategory);
        context.redirect('/admin/category');
    }
    
    async editCategory(context) {
        let name = context.query.name;
        context.render('editcategory.njk.html',{ name });
        context.session.idcate = context.query.id;
    }

    async handleEditCategory(context) {
        let nameProduct = context.request.body.nameCategory;
        if(context.session.idcate) {
            context.categoryRepository.editCategoryById(context.session.idcate, nameProduct);
            context.session.idcate = null;
        } 
        context.redirect('/admin/category');
    }

    async deleteCategory(context, next) {
        let id = context.request.body.id;
        context.response.body = await context.categoryRepository.deleteCategoryById(id);
    }
}

module.exports = CategoryController;