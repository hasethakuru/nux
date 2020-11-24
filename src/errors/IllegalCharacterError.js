import BaseError from "./BaseError.js";

export default class IllegalCharacterError extends BaseError {
    constructor(fn, line, col, token, details) {
        super('Illegal Character', fn, line, col, token, details);
    }
}