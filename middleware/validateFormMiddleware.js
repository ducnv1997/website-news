
class ValidateFormMiddleware {
    constructor(validator) {
        this.validator = validator;
    }

    sanitizerData(data) {
        data = this.validator.unescape(data);
        return this.validator.trim(data);
    }

    checkEmptyDataForm(array) {
        for (let i = 0; i < array.length; i++) {
            if(this.validator.isEmpty(array[i])){
                return "you need input full data";
            }
        }
        
    }
}
 module.exports = ValidateFormMiddleware;