const LikeRepository = require('./likeRepository');

module.exports = (knex) => {
    const likeRepository = new LikeRepository(knex);
    return async (context, next) => {
        context.likeRepository = likeRepository;
        await next();
    }
}