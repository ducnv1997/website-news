class Category {
    constructor(id, name) {
        this.id     = id;
        this.name   = name;
    }

    getIdCategory() {
        return this.id;
    }
    getNameCategory() {
        return this.name;
    }
}
module.exports = Category;