class Comment {
    constructor(id, id_post, username, content, created_at, updated_at) {
        this.id         = id;
        this.id_post    = id_post;
        this.username    = username,
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

    getUsername() {
        return this.username;
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