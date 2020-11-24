export default class BinOpNodeManager {
    constructor (left, operation, right) {
        this.left = left;
        this.op = operation;
        this.right = right;
    }

    toString() {
        return `(${this.left}, ${this.op}, ${this.right})`;
    }
}