import Token from '../../Token.js';

export default class BinOpNodeManager {
    /**
     * Binary Operation Node Manager
     * @param {Token} left 
     * @param {Token} operation 
     * @param {Token} right 
     */
    constructor (left, operation, right) {
        this.left = left;
        this.op = operation;
        this.right = right;

        this.start = this.left.start;
        this.end = this.right.end;
    }

    toString() {
        return `(${this.left}, ${this.op}, ${this.right})`;
    }
}