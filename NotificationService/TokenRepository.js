class TokenRepository {

    constructor(knex) {
        this.knex = knex;
    }

    async getAllToken() {
        return await this.knex.select('*').from('token');
    }

    async getTokenByToken(token) {
        return await this.knex.select('*').from('token').where('token' ,'=', token);
    }

    async storeToken(token) {
        return await this.knex('token').insert({
            token     : token
        })
    }

    async deleteToken(token){
        return await this.knex('token').where('token', '=', token).del();
    }

}
module.exports = TokenRepository;