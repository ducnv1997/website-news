const Admin = require('./Admin');
const alert = require('alert-node')


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

    // async checkEmailBeforeRegisterUser(email) {
    //     return this.knex('users').where('email','=',email);
    // }

    async checkUsernameBeforeRegisterUser( username) {
        return this.knex('users').where('username','=',username);
    }

    async registerUser(fullname, address, email, username, password){
        return await this.knex('users').insert({
            fullname    : fullname,
            address     : address,
            email       : email,
            username    : username,
            password    : password
        })
    }

    async registerUserWithFacebook(fullname, username, password){
        return await this.knex('users').insert({
            fullname    : fullname,
            username    : username,
            password    : password
        })
    }

    async appointUser(id) {
        return await this.knex('users').where('id', '=', id).update({
            id_role: 2,
            thisKeyIsSkipped: undefined
        })
    }

    async demotiontUser(id) {
        return await this.knex('users').where('id', '=', id).update({
            id_role: 1,
            thisKeyIsSkipped: undefined
        })
    }

    async deleteUser(id) {
        return this.knex('users').where('id', '=', id).del();
    }
}

module.exports = AdminRepository;