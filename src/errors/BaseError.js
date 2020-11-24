
export default class BaseError { 
    constructor (name, fn, line, col, token, details) {
        this.name = name;
        this.fn = fn;
        this.line = line;
        this.col = col;
        this.token = token;
        this.details = details;
    }

    toString() {
        let error = `${this.name} -> ${this.details}\n`;
        error+= `File ${this.fn} | Line ${this.line.number} | Column ${this.col}\n\n`;
        error+= `${this.line.full}\n`
        error+= ' '.repeat(this.col) + '^'.repeat(this.token.length);

        return error;
    }

}