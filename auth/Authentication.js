class Authentication {
    constructor(adminRepository, bcrypt, session) {
        this.adminRepository    = adminRepository;
        this.bcrypt             = bcrypt;
        this.session            = session;
    }   
    async checkAcc(user, pass) {
        let User = await this.adminRepository.getUser(user);
        if(!User[0]){
            return false;
        }else if(!await this.bcrypt.checkPassword(pass,User[0].password)){
            return false;
        }else{
            return User[0].id;
        }
    }
    createSessionLogined(id) {
        this.session.logined = id;
    }

    destroySessionLogined() {
        this.session.logined = null;
    }
}

module.exports = Authentication;