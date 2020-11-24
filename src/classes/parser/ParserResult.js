export default class ParseResult {
    constructor () {
        this.error = null;
        this.node = null;
    }

    register(res) {
        if(res instanceof ParseResult) {
            if(res.error) this.error = res.error;
            
            return res.node;
        }

        return res;
    }

    success(node) {
        this.node = node;
        return this;
    }

    failure (err) {
        this.error = err
        return this;
    }
}