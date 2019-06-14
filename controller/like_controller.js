class LikeController {
    async handleLike(context) {

        try {
            let checkLike = await context.likeService.checkLike(context.request.body.idpost, context.session.UserLogined.id);
            
            if(!checkLike.length) {
                await context.likeService.like(context.request.body.idpost, context.session.UserLogined.id);
                return context.response.body = "like";
            }else {
                await context.likeService.unLike(checkLike[0].id);
                return context.response.body = "unlike";
            }
        } catch (error) {
            throw new Error(error);
        }
        

    }
}
module.exports = LikeController;