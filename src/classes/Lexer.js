import Token from "./Token.js";
import { TT, OPERATORS } from '../util/CONSTANTS.js'
import IllegalCharacterError from "../errors/IllegalCharacterError.js";
import Position from "./Position.js";

export default class Lexer {
    /**
     * Lexer
     * @param {string} fn
     * @param {string} text 
     */
    constructor (fn, text) {
        /**
         * @type {string}
         */
        this.fn = fn;

        /**
         * @type {string}
         */
        this.text = text.trim();

        /**
         * @type {string | null}
         */
        this.token = null;

        /**
         * @type {Position}
         */
        this.position = new Position(-1, { content: '',number: 1}, 0, this.fn, this.text);

        this.advance();
    }

    /**
     * Advance to the next character
     */
    advance() {
        this.position.advance(this.token)    
        this.token = this.position.index < this.text.length ? this.text[this.position.index] : null;
    }

    /**
     * Create Tokens
     */
    create() {
        const result = {
            error: false,
            errorMessage: '',
            tokens: []
        };

        while (this.token !== null) {
            if(this.token === '\r') {
                this.advance();
                continue;
            } else if(this.token === ' ') {
                this.advance();
                continue;
            } else if (TT.DIGITS.includes(this.token)) {
                result.tokens.push(this.createInteger());
                continue;
            } else if(OPERATORS[this.token]) {
                result.tokens.push(new Token(TT[OPERATORS[this.token]], null, this.position));
                this.advance();
                continue;
            } else if(this.token === '(') {
                result.tokens.push(new Token(TT.LPAREN, null, this.position));
                this.advance();
                continue;
            } else if(this.token === ')') {
                result.tokens.push(new Token(TT.RPAREN, null, this.position));
                this.advance();
                continue
            } else {
                let token = this.token;
                let start = this.position.copy();
                this.advance();
                result.error = true
                result.errorMessage = new IllegalCharacterError(token, start, this.position);
                return result;
            }
        }

        result.tokens.push(new Token(TT.EOF, null, this.position))


        return result;
    }

    /**
     * Create Int
     */
    createInteger () {
        let int = '';
        let dots = 0;
        let digits = TT.DIGITS + '.';
        let start = this.position.copy();

        while (this.token !== null && digits.includes(this.token)) {
            if(this.token === '.') {
                if(dots === 1) break;
                dots++;
                int+= this.token
            } else {
                int+= this.token
            }

            this.advance();
        }

        if(dots === 0) {
            return new Token(TT.INT, Number(int), start, this.position);
        } else return new Token(TT.FLOAT, parseFloat(int), start, this.position);
    }
}