class PaginatorMiddelware {

     calculateTotalPage(limit ,totalPost) {
        let totalPage = Math.ceil(totalPost[0]["count(`id`)"] / limit);
        return  totalPage;
    }

    calculateOffset(limit ,currentPage) {
        return  (currentPage - 1) * limit;
    }

}
 module.exports = PaginatorMiddelware;