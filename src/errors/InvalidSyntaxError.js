import BaseError from "./BaseError.js";

export default class InvalidSyntaxError extends BaseError {   
    constructor(fn, line, col, token, details) {
        super('Invalid Syntax', fn, line, col, token, details);
    }
}