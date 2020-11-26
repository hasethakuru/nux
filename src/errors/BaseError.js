import Position from '../classes/Position.js';

export default class BaseError { 
    /**
     * 
     * @param {string} name 
     * @param {string} message 
     * @param {Position} start 
     * @param {Position} end 
     */
    constructor (name, message, start, end) {
        this.name = name;
        this.message = message;
        this.start = start;
        this.end = end;
    }

    toString() {
        let error = `${this.name} -> ${this.message}\n`;
        error+= `File ${this.start.fn} | Line ${this.start.line.number} | Column ${this.start.col}\n\n`;
        error+= this.end.line.content+'\n';
        error+= ' '.repeat(this.start.col / this.end.col) + '^'.repeat(Number(this.start.col));
        return error;
    }


}