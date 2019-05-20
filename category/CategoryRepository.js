const Category = require('./Category')

class CategoryRepository {
    constructor(knex) {
        this.knex = knex
    }

    async getAllCategory() {
        let results = await this.knex.select('*').from('category');
        return results.map(result => new Category(result.id,result.name));
    }

    async editCategoryById(id, newName) {
            return await this.knex('category').where('id', '=', id).update({
                name: newName,
                thisKeyIsSkipped: undefined
            })
    }

    async addCategory(nameCategory) {
        return await this.knex('category').insert({name: nameCategory})
    }

    async deleteCategoryById(id) {
        return this.knex('category').where('id', '=', id).del();
    }

    async checkNameCategory(name) {
        let data = await this.knex('category').where('name', '=', name);
        if(data.length){
            return false;
        }
        return true;
    }
}

module.exports = CategoryRepository;