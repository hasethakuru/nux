export default class Context {
    constructor (name, parent=null, position) {
        this.displayName = name;
        this.parent = parent;
        this.position = position
    }
}