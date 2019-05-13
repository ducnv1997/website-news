const CategoryRepository = require('./CategoryRepository');

module.exports = (knex) => {
    const categoryRepository = new CategoryRepository(knex);
    return async (context, next) => {
        context.categoryRepository = categoryRepository;
        await next();
    }
}