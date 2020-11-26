export default class Position {
    /**
     * Position
     * @typedef {object} Line
     * @property {number} number
     * @property {string} content
     * @param {number} index 
     * @param {Line} line 
     * @param {number} col 
     * @param {string} fn 
     * @param {string} text 
     */
    constructor (index, line, col, fn, text) {
        this.index = index;
        this.line = line;
        this.col = col;
        this.fn = fn;
        this.text = text;
    }

    advance(token=null) {
        this.index++;
        this.col++;

        if(token === '\n') {
            this.line.number++;
            this.line.content = '';
            this.col = 0;
        }

        if(token !== null) this.line.content+= token;

        return this
    }

    copy() {
        return new Position(this.index, this.line, this.col, this.fn, this.text);
    }
}