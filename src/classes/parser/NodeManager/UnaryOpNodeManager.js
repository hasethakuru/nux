export default class UnaryOpNodeManager {
    constructor (operation, node) {
        this.op = operation;
        this.node = node;
    }

    toString() {
        return `(${this.op}, ${this.node})`
    }
}