class UserController {
    async index(context) {
        let users = await context.userRepository.getAllUser();
        let user      = context.session.logined
        context.render('admin/users.njk.html', {users, user});
    }

    async appointUser(context) {
        context.response.body = await context.userRepository.appointUser(context.request.body.id);
    }

    async demotiontUser(context) {
        context.response.body = await context.userRepository.demotiontUser(context.request.body.id);

    }

    async deleleUser(context) {
        context.response.body = await context.userRepository.deleteUser(context.request.body.id);
    }

}
 module.exports = UserController;