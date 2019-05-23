class LikeController {
    async handleLike(context) {


        if(!context.request.body.id) {
            return context.response.body = "not login";
        }

        let checkLike = await context.likeRepository.checkLike(context.request.body.idpost, context.request.body.id);

        if(!checkLike.length) {
             await context.likeRepository.like(context.request.body.idpost, context.request.body.id);
             return context.response.body = "like";
        }else {
            await context.likeRepository.unLike(checkLike[0].id);
            return context.response.body = "unlike";
        }

    }
}
module.exports = LikeController;