const AdminRepository = require('./AdminRepository');

module.exports = (knex) => {
    const adminRepository = new AdminRepository(knex);
    return async (context, next) => {
        context.adminRepository = adminRepository;
        await next();
    }
}