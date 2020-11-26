export default class Token {
    constructor (type, value=null, start=null, end=null) {
        this.type = type;
        this.value = value;
        
        if(start) {
            this.start = start.copy();
            this.end = start.copy();
            this.end.advance();
        }

        if(end) {
            this.end = end;
        }
    }

    toString() {
        if(this.value) return `${this.type}:${this.value}`;

        return this.type;
    }

}