const User = require('./User');


class UserRepository {

    constructor(knex) {
        this.knex = knex
    }

    async getAllUser() {
        let results = await this.knex.select('users.*','role.description').from('users').join('role', {'role.id': 'users.id_role'});
        return results.map(result => new User(result.id,result.fullname, result.address, result.email, result.description, result.username, result.password, result.avatar, result.created_at));
    }

    async getUserByUsername(username) {
        let result = await this.knex.select('users.*','role.description').from('users').join('role', {'role.id': 'users.id_role'}).where('username','=',username);
        return result.map(result => new User(result.id,result.fullname, result.address, result.email, result.description, result.username, result.password, result.avatar, result.created_at));
    }

    async checkUsernameBeforeRegisterUser(username) {
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

    async registerUserWithFacebook(fullname, username, password, avatar) {
        return await this.knex('users').insert({
            fullname    : fullname,
            username    : username,
            password    : password,
            avatar      : avatar
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

    async changePassword(idUser, newPassword){
        return await this.knex('users').where('id', '=', idUser).update({
            password: newPassword,
            thisKeyIsSkipped: undefined
        })
    }

    async changeInfo(idUser, fullname, address, email, avatar) {
        return await this.knex('users').where('id', '=', idUser).update({
            fullname: fullname,
            address : address,
            email   : email,
            avatar  : avatar,
            thisKeyIsSkipped: undefined
        })
    }
}

module.exports = UserRepository;