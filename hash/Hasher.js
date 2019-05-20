class Hasher {
    constructor(hasher,round) {
        this.hasher = hasher;
        this.round  = round;
    }
    async hashPassword(value) {
        return await this.hasher.hash(value,this.round);
    }
    async checkPassword(value, valueHashed) {
        return await this.hasher.compare(value, valueHashed);
    }
}
module.exports = Hasher;