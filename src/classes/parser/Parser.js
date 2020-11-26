import BinOpNodeManager from "./NodeManager/BinOpNodeManager.js";
import ParseResult from "./ParserResult.js";
import { TT } from '../../util/CONSTANTS.js'; 
import Token from "../Token.js";
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
    constructor(tokens) {
        this.tokens = tokens;
        this.index = -1;
        this.advance();

    }

    /**
     * Advance to the next token
     */
    advance () {
        this.index++;
        if(this.index < this.tokens.length) {
            /**
             * @type {Token}
             */
            this.token = this.tokens[this.index];

        }
        return this.token;
    }

    /**
     * Parse
     */
    parse () {
        const res = this.expr();
        if(!res.error && this.token.type !== TT.EOF) {
            return res.failure(new InvalidSyntaxError(`Expected '+', '-', '*', '/' or '^'`, this.token.start, this.token.end));
        }

        return res
    }

    /**
     * Atom
     */
    atom () {
        const res = new ParseResult();
        const token = this.token;

        if([TT.INT, TT.FLOAT].has(token.type)) {
            res.register(this.advance());
            return res.success(new NumberNodeManager(token));
        } else if(token.type === TT.LPAREN) {
            res.register(this.advance());
            let expr = res.register(this.expr());
            if(res.error) return res;
            if(this.token.type === TT.RPAREN) {
                res.register(this.advance());
                return res.success(expr);
            } else {
                return res.failure(new InvalidSyntaxError(`Expected ')'`, this.token.start, this.token.end));
            };
        }

        return res.failure(new InvalidSyntaxError(`Expected INT, FLOAT, '+', '-' or '('`, token.start, token.end));
    }

    /**
     * Factor
     */
    factor () {
        let res = new ParseResult();
        let token = this.token

        if([TT.PLUS, TT.MINUS].has(token.type)) {
            res.register(this.advance());
            let factor = res.register(this.factor());
            if(res.error) return res;
            return res.success(new UnaryOpNodeManager(token, factor));
        }

        return this.power();
    }

    /**
     * Power
     */
    power() {
        return this.binOp(this.atom.bind(this), [TT.POWER], this.factor.bind(this))
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
    binOp(method, array, methodB) {
        if(!methodB) {
            methodB = method;
        }
        const res = new ParseResult();
        let left = res.register(method())

        while (array.includes(this.token.type)) {
            let operation = this.token
            res.register(this.advance());
            let right = res.register(methodB());

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