class Comment {
    constructor(id, id_post, fullname, content, created_at, updated_at) {
        this.id         = id;
        this.id_post    = id_post;
        this.fullname   = fullname,
        this.content    = content,
        this.created_at = created_at,
        this.updated_at = updated_at
    }

    getId() {
        return this.id;
    }

    getIdPost() {
        return this.id_post;
    }

    getFullname() {
        return this.fullname;
    }

    getContent() {
        return this.content;
    }

    getCreatedAt() {
        return this.created_at;
    }

    getUpdatedAt() {
        return this.updated_at;
    }


}
module.exports = Comment;