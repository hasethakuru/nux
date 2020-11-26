import Lexer from './classes/Lexer.js'
import Parser from './classes/parser/Parser.js';
import Interpreter from './classes/interpreter/Interpreter.js';
import Context from './classes/interpreter/Context.js';

export default (file, tokens) => {

    // Generate Tokens
    const lexer = new Lexer(file, tokens);
    const result = lexer.create();


    if(result.error) return result.errorMessage.toString();

    // Generate AST
    const parser = new Parser(result.tokens);
    const ast = parser.parse();
    
    if(ast.error) return ast.error.toString();

    // Run
    const interpreter = new Interpreter();
    const context = new Context('<Program>');
    const interpretered = interpreter.visit(ast.node, context);

    if(interpretered.error) return interpretered.error.toString();

    return interpretered.value.toString();

}