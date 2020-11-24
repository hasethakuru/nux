import TokenManager from "./TokenManager.js";
import { TT, OPERATORS } from '../util/CONSTANTS.js'
import IllegalCharacterError from "../errors/IllegalCharacterError.js";

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
         * @type {number}
         */
        this.index = -1

        /**
         * @type {number}
         */
        this.col = 0;
        
        /**
         * @typedef {object} Line
         * @property {number} Number
         * @property {string} content
         * @property {string} full
         * @type {Line}
         */

        this.line = {
            number: 1,
            content: '',
        }

        this.advance();
    }

    /**
     * Advance to the next character
     */
    advance() {
        this.index++;
        this.col++;
        this.token = this.index < this.text.length ? this.text[this.index] : null;
        if(this.token) this.line.content+=this.token;
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
                this.advanceLine();
                continue;
            } else if(this.token === ' ') {
                this.advance();
                continue;
            } else if (TT.DIGITS.includes(this.token)) {
                result.tokens.push(this.createInteger());
                continue;
            } else if(OPERATORS[this.token]) {
                result.tokens.push(TokenManager.createToken(TT[OPERATORS[this.token]]));
                this.advance();
                continue;
            } else if(this.token === '(') {
                result.tokens.push(TokenManager.createToken(TT.LPAREN));
                this.advance();
                continue;
            } else if(this.token === ')') {
                result.tokens.push(TokenManager.createToken(TT.RPAREN));
                this.advance();
                continue
            } else {
                let token = this.token;
                this.advance();
                result.error = true,
                result.errorMessage = `Illegal Character -> ${token}`
                return result;
            }
        }

        result.tokens.push(TT.EOF)

        return result;
    }

    getFullLine() {
        let i = this.index;
        let curren = this.line
        while (this.text[i] !== null) {
            if (this.text[i] === '\n') {
                break;
            }

            curren.content += this.text[i];
            i++;
        }

        return curren
    }

    /**
     * Advance to the next line
     */
    advanceLine() {
        this.line.number++;
        this.line.content = '';
        this.col = 0;
        this.advance()
        this.advance();
    }

    /**
     * Create Int
     */
    createInteger () {
        let int = '';
        let dots = 0;
        let digits = TT.DIGITS + '.';

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
            return TokenManager.createToken(TT.INT, Number(int));
        } else return TokenManager.createToken(TT.FLOAT, parseFloat(int));
    }
}