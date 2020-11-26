export default class UnaryOpNodeManager {
    constructor (operation, node) {
        this.op = operation;
        this.node = node;
        this.start = this.op.start;
        this.end = node.end;
    }

    toString() {
        return `(${this.op}, ${this.node})`
    }
}