class CategoryController {


    async index(context) {
        let categorys = await context.categoryRepository.getAllCategory();
        context.render('categoryadmin.njk.html', {categorys});

    }

    async addCategory(context) {
        context.render('addcategory.njk.html');
    }

    async handleAddCategory(context) {
        
        let nameCategory = await context.validateFormMiddleware.sanitizerData(context.request.body.nameCategory);
        let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([context.request.body.nameCategory]);
        if(checkEmpty){
            context.alert(checkEmpty);
        }else if(await context.categoryRepository.checkNameCategory(nameCategory)){
            await context.categoryRepository.addCategory(nameCategory);
        }else{
            context.alert('Category name used');
        }
        context.redirect('/admin/category');
    }
    
    async editCategory(context) {
        let name = await context.validateFormMiddleware.sanitizerData(context.query.name);
        context.render('editcategory.njk.html',{ name });
        context.session.idcate = context.query.id;
    }

    async handleEditCategory(context) {
        let nameCate =  await context.validateFormMiddleware.sanitizerData(context.request.body.nameCategory);
        if(context.session.idcate) {
            context.categoryRepository.editCategoryById(context.session.idcate, nameCate);
            context.session.idcate = null;
        } 
        context.redirect('/admin/category');
    }

    async deleteCategory(context) {
        let id = context.request.body.id;
        context.response.body = await context.categoryRepository.deleteCategoryById(id);
    }
}

module.exports = CategoryController;