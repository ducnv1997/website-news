class Authentication {
    constructor(userRepository, bcrypt, session) {
        this.userRepository    = userRepository;
        this.bcrypt             = bcrypt;
        this.session            = session;
    }   

    async checkAcc(username, password) {
        let user = await this.userRepository.getUserByUsername(username);
        if( user.length && await this.bcrypt.checkPassword(password,user[0].password) ) {
            return user[0];
        }else{
            return false;
        }
    }

    createSessionLogined(id) {
        this.session.logined = id;
    }

    destroySessionLogined() {
        this.session.logined = null;
    }

    createSessionUserLogined(user) {
        this.session.UserLogined = user;
    }

    destroySessionUserLogined() {
        this.session.UserLogined = null;
    }
}

module.exports = Authentication;