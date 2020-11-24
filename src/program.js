import Lexer from './classes/Lexer.js'
import Parser from './classes/parser/Parser.js';

export default (file, tokens) => {

    // Generate Tokens
    const lexer = new Lexer(file, tokens);
    const result = lexer.create();

    if(result.error) return console.log(result.errorMessage.toString());

    // Generate AST
    const parser = new Parser(result.tokens, file, lexer.line, lexer.col);
    const ast = parser.parse();


    if(ast.error) return console.log(ast.error.toString());

    console.log(ast.node.toString());

}