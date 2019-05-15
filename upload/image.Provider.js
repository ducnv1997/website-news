const Image = require('./Image');
module.exports = (fs) => {
    const image = new Image(fs);
    return async(context, next) => {
        context.image = image;
        await next();
    }
}