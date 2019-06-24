const TokenRepository = require('./TokenRepository');

module.exports = (knex) => {
    const tokenRepository = new TokenRepository(knex);
    return async (context, next) => {
        context.tokenRepository = tokenRepository;
        await next();
    }
}