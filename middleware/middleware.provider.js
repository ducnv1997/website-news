const PaginatorMiddelware       = require('./PaginatorMiddelware.');
const alert                     = require('alert-node');


module.exports = (cache, fcm) => {
    return async (context, next)=> {

        const paginatorMiddelware      = new PaginatorMiddelware();
        context.paginatorMiddelware    = paginatorMiddelware;
        context.alert                  = alert;
        context.cache                  = cache;
        context.fcm                    = fcm;
        await next();
    }
}