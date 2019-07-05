const Hasher = require('./Hasher');
const bcrypt = require('bcryptjs');
module.exports = (round) => {
    const hasher = new Hasher(bcrypt, round);
    return async(context, next) => {
        context.hasher = hasher;
        await next();
    }
}