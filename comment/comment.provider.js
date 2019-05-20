const CommentRepository = require('./commentRepository');

module.exports = (knex) => {
    const commentRepository = new CommentRepository(knex);
    return async (context, next) => {
        context.commentRepository = commentRepository;
        await next();
    }
}