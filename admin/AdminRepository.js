const Admin = require('./Admin')

class AdminRepository {
    constructor(knex) {
        this.knex = knex
    }

    async getAllUser() {
        let results = await this.knex.select('users.*','role.description').from('users').join('role', {'role.id': 'users.id_role'});
        return results.map(result => new Admin(result.id,result.fullname, result.address, result.email, result.description, result.username, result.password));
    }

    async getUser(username) {
        let result = await this.knex.select('users.*','role.description').from('users').join('role', {'role.id': 'users.id_role'}).where('username','=',username);
        return await result.map(result => new Admin(result.id,result.fullname, result.address, result.email, result.description, result.username, result.password));
    }
}

module.exports = AdminRepository;