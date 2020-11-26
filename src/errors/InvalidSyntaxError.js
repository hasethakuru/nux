import BaseError from "./BaseError.js";

export default class InvalidSyntaxError extends BaseError {   
    constructor(message, start, end) {
        super('Invalid Syntax', message, start, end);
    }
}