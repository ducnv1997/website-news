class Authentication {
    constructor(adminRepository, bcrypt, session) {
        this.adminRepository    = adminRepository;
        this.bcrypt             = bcrypt;
        this.session            = session;
    }   
    async checkAcc(user, pass) {
        let User = await this.adminRepository.getUser(user);
        if(!User[0]){
            console.log("not found user");
            return false;
        }else if(!await this.bcrypt.checkPassword(pass,User[0].password)){
            console.log('password fail');
            return false;
        }else{
            return true;
        }
    }
    createSessionLogined(username) {
        this.session.logined = username;
    }

    destroySessionLogined() {
        this.session.logined = null;
    }

    checkSessionLogined() {
        if(!this.session.logined) {
            return false;
        }
        return true;
    }
}

module.exports = Authentication;