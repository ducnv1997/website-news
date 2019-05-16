class Post {
    constructor(id, title, category, description, avatar, view, created_at) {
        this.id         = id;
        this.title      = title;
        this.category   = category;
        this.description= description;
        this.avatar     = avatar;
        this.view       = view;
        this.created_at = created_at;
    }

    getIdPost() {
        return this.id;
    }
    getTitlePost() {
        return this.title;
    }
    getCategory() {
        return this.category;
    }
    getDescription() {
        return this.description;
    }
    getAvatar() {
        return this.avatar;
    }
    getViewPost() {
        return this.view;
    }
    getTimeCreatePost() {
        return this.created_at;
    }
}
module.exports = Post;