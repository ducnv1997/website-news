const CommentService = require('./CommentService');

module.exports = (knex) => {
    const commentService = new CommentService(knex);
    return async (context, next) => {
        context.commentService = commentService;
        await next();
    }
}