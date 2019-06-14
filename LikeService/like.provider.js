const LikeService = require('./LikeService');

module.exports = (knex) => {
    const likeService = new LikeService(knex);
    return async (context, next) => {
        context.likeService = likeService;
        await next();
    }
}