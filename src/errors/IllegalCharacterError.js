import BaseError from "./BaseError.js";

export default class IllegalCharacterError extends BaseError {
    constructor(message, start, end) {
        super('Illegal Character', message, start, end);
    }
}