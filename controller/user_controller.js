class UserController {
    async index(context) {
        let users = await context.adminRepository.getAllUser();
        context.render('users.njk.html', {users});
    }

    async appointUser(context) {
        context.response.body = await context.adminRepository.appointUser(context.request.body.id);
    }

    async demotiontUser(context) {
        context.response.body = await context.adminRepository.demotiontUser(context.request.body.id);

    }

    async deleleUser(context) {
        context.response.body = await context.adminRepository.deleteUser(context.request.body.id);
    }

}
 module.exports = UserController;