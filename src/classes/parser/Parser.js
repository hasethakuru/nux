import BinOpNodeManager from "./NodeManager/BinOpNodeManager.js";
import ParseResult from "./ParserResult.js";
import { TT } from '../../util/CONSTANTS.js'; 
import TokenManager from "../TokenManager.js";
import UnaryOpNodeManager from "./NodeManager/UnaryOpNodeManager.js";
import NumberNodeManager from "./NodeManager/NumberNodeManager.js";
import InvalidSyntaxError from "../../errors/InvalidSyntaxError.js";

export default class Parser {
    /**
     * Parser
     * @param {string[]} tokens 
     * @param {string} fn
     * @param {object} line
     * @param {number} col
     */
    constructor(tokens, fn, line, col) {
        this.tokens = tokens;
        this.index = -1;
        this.fn = fn;
        this.line = line;
        this.col = col;
        this.advance();

    }

    /**
     * Advance to the next token
     */
    advance () {
        this.index++;
        if(this.index < this.tokens.length) {
            this.token = this.tokens[this.index];
        }
        return this.token;
    }

    /**
     * Parse
     */
    parse () {
        const res = this.expr();
        if(!res.error && TokenManager.getType(this.token) !== TT.EOF) {
            return res.failure(`File ${this.fn}| Line ${this.line.number} | Column ${this.col}\n Expected '+', '-', '*', '/' or '^'`);
        }

        return res
    }

    /**
     * Factor
     */
    factor () {
        const res = new ParseResult();
        const token = this.token;
        const type = TokenManager.getType(token);

        if([TT.PLUS, TT.MINUS].has(type)) {
            res.register(this.advance());
            let factor = res.register(this.factor());
            if(res.error) return res;
            return res.success(new UnaryOpNodeManager(token, factor));
        } else if([TT.INT, TT.FLOAT].has(type)) {
            res.register(this.advance());
            return res.success(new NumberNodeManager(token));
        } else if(type === TT.LPAREN) {
            res.register(this.advance());
            let expr = res.register(this.expr());
            if(res.error) return res;
            if(TokenManager.getType(this.token) === TT.RPAREN) {
                res.register(this.advance());
                return res.success(expr);
            } else {
                return res.failure(`File ${this.fn}| Line ${this.line.number} | Column ${this.col}\n Expected ')'`);
            };
        }

        return res.failure(`File ${this.fn}| Line ${this.line.number} | Column ${this.col}\n Expected INT or FLOAT`);
    }

    /**
     * Expression
     */
    expr() {
        return this.binOp(this.term.bind(this), [TT.PLUS, TT.MINUS])
    }

    /***
     * Term
     */
    term() {
        return this.binOp(this.factor.bind(this), [TT.MUL, TT.DIV])
    }

    /**
     * Binary Operation
     * @param {Function} method 
     * @param {string[]} array 
     */
    binOp(method, array) {
        const res = new ParseResult();
        let left = res.register(method())

        while (array.includes(this.token)) {
            let operation = this.token
            res.register(this.advance());
            let right = res.register(method());

            if(res.error) return res;

            left = new BinOpNodeManager(left, operation, right);
        }

        return res.success(left);
    }
}

/**
 * Check if an array has an element
 * @param {any} el 
 */
Array.prototype.has = function (el) {
    return this.includes(el);
}