class Hasher {
    constructor(hasher,round) {
        this.hasher = hasher;
        this.round  = round;
    }
    async hashPassword(value) {
        this.hasher.hash(value,this.round,(err, res) => {
            return res;
        })
    }
    async checkPassword(value, valueHashed) {
        return await this.hasher.compare(value, valueHashed);
    }
}
module.exports = Hasher;