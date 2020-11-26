export default class RTResult {
    constructor () {
        this.error = null;
        this.value = null;
    }

    register(res) {
        if(res.error) this.error = res.error;
        
        return res.value;
    }

    success(value) {
        this.value = value;
        return this;
    }

    failure (err) {
        this.error = err
        return this;
    }
}