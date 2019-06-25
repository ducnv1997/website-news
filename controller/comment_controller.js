class CommentController {

    async addcomment(context) {
        try {
            await context.commentService.addComment(context.message, context.session.UserLogined.id, context.query.idpost);
        } catch (error) {
            return context.redirect('/notfound');
        }
        context.redirect('back');
    }

    async deleteComment(context) {
        context.body = await context.commentService.deleteComment(context.request.body.id);
    }

    async editComment(context) {
        await context.commentService.editComment(context.request.body.id, context.message)
        context.body = context.message;
    }

}
module.exports = CommentController;