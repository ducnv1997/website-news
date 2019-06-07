class LikeController {
    async handleLike(context) {

        try {
            let checkLike = await context.likeRepository.checkLike(context.request.body.idpost, context.session.UserLogined.id);
            if(!checkLike.length) {
                await context.likeRepository.like(context.request.body.idpost, context.session.UserLogined.id);
                return context.response.body = "like";
            }else {
                await context.likeRepository.unLike(checkLike[0].id);
                return context.response.body = "unlike";
            }
        } catch (error) {
            throw new Error(error);
        }
        

    }
}
module.exports = LikeController;