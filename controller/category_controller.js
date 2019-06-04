class CategoryController {


    async index(context) {
        let categorys = await context.categoryRepository.getAllCategory();
        context.render('categoryadmin.njk.html', {categorys});
    }

    async addCategory(context) {
        context.render('addcategory.njk.html');
    }

    async handleAddCategory(context) {
        let category = await context.categoryRepository.checkNameCategory(context.nameCategory);
        
       if(category.length) {
            context.alert('Category name used');
            return context.redirect('back');
        }
        await context.categoryRepository.addCategory(context.nameCategory);
        context.nameCategory = null;
        context.redirect('/admin/category');
    }
    
    async editCategory(context) {
        let name =context.query.name;
        context.render('editcategory.njk.html',{ name });
        context.session.idcate = context.query.id;
    }

    async handleEditCategory(context) {
        let category = await context.categoryRepository.checkNameCategory(context.nameCategory);
        if(category.length) {
            context.alert('Category name used');
            return context.redirect('back');
        }

        if(context.session.idcate) {
            context.categoryRepository.editCategoryById(context.session.idcate, context.nameCategory);
        }
        
        context.session.idcate  = null;
        context.nameCategory    = null;
        context.redirect('/admin/category');
    }

    async deleteCategory(context) {
        let id = context.request.body.id;
        context.response.body = await context.categoryRepository.deleteCategoryById(id);
    }
}

module.exports = CategoryController;