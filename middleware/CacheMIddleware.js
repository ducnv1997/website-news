
class CacheMiddleware {

    async savePosMostViewToCache(context, next) {

        let postsMostView   =await context.cache.get('postsMostView');
        if (!postsMostView) {
            postsMostView = context.cache.put('postsMostView', await context.postRepository.getPostMostView(), 300000);
        }
        context.postsMostView = postsMostView;

        await next();
    }

    async destroyCachePostMostView(context) {
       context.cache.del('postsMostView');
    }

}

module.exports = CacheMiddleware;