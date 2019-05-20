class CommentController {



    async addcomment(context) {
        let message     = await context.validateFormMiddleware.sanitizerData(context.request.body.message);
        let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([message]);        

        if(checkEmpty) {
            context.alert("Message empty");
        }else{
            await context.commentRepository.addComment(message, context.query.iduser, context.query.idpost);
        }
        context.redirect('/contentpost?id='+ context.query.idpost);
    }

    async deleteComment(context) {
        context.body = await context.commentRepository.deleteComment(context.request.body.id);
    }

    async editComment(context) {
        let checkEmpty  = await context.validateFormMiddleware.checkEmptyDataForm([context.request.body.content]);
        if (checkEmpty) {
            context.alert("Message empty");
        }else{
            await context.commentRepository.editComment(context.request.body.id, context.request.body.content)
            context.body = context.request.body;
        }
         
    }

}
module.exports = CommentController;