class User {
    constructor(id, fullname, address, email, role, username, password, avatar, created_at) {
        this.id             = id;
        this.fullname       = fullname;
        this.address        = address;
        this.email          = email;
        this.role           = role;
        this.username       = username;
        this.password       = password;
        this.avatar         = avatar;
        this.created_at     = created_at;
    }

    getId() {
        return this.id;
    }

    getFullname() {
        return this.fullname;
    }
    getAddress() {
        return this.address;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.id_role;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getAvatar() {
        return this.avatar;
    }
    getCreated_at() {
        return this.created_at;
    }
}
module.exports = User;