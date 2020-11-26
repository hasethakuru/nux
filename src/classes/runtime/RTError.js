import BaseError from "../../errors/BaseError.js";

export default class RTError extends BaseError {
    constructor(message, start, end, context) {
        super('RunTime Error', message, start, end);
        this.context = context;
    }

    toString() {
        let result  = this.getTraceback()
		result+= this.end.line.content+'\n';
        result+= ' '.repeat(this.start.col / this.end.col) + '^'.repeat(Number(this.start.col));
		return result
    }

    getTraceback() {
        let result = ''
		let pos = this.start
    	let ctx = this.context

		while (ctx) {
			result = `File ${pos.fn} | Line ${pos.line.number} In ${ctx.displayName}\n` + result
			pos = ctx.position
            ctx = ctx.parent
        }

		return 'Traceback (most recent call last):\n' + result

    }
}