class Post {
    constructor(id, title, category, view, created_at) {
        this.id         = id;
        this.title      = title;
        this.category   = category;
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
    getViewPost() {
        return this.view;
    }
    getTimeCreatePost() {
        return this.created_at;
    }
}
module.exports = Post;