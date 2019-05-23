class Authentication {
    constructor(adminRepository, bcrypt, session) {
        this.adminRepository    = adminRepository;
        this.bcrypt             = bcrypt;
        this.session            = session;
    }   
    async checkAcc(user, pass) {
        let User = await this.adminRepository.getUser(user);
         if( !User[0] ||  !await this.bcrypt.checkPassword(pass,User[0].password) && User[0].role == "admin" ) {
            return false;
        }else{
            return User[0];
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