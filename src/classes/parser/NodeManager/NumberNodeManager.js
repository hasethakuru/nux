export default class NumberNodeManager {
    constructor (token) {
        this.token = token;
        this.start = token.start;
        this.end = token.end
    }

    toString() {
        return this.token.toString();
    }
}