class Like {
    constructor(id, id_post, id_user, created_at){
        this.id         = id,
        this.id_post    = id_post,
        this.id_user    = id_user,
        this.created_at = created_at
    }

    getId() {
        return this.id;
    }

    getIdPost() {
        return this.id_post;
    }

    getIdUser() {
        return this.id_user;
    }

    getCreatedAt() {
        return this.created_at;
    }

}

module.exports = Like;