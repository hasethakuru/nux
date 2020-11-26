import base from 'prompt-sync';
import chalk from 'chalk';
import program from './program.js';

const prompt = base();

const repl = async () => {
    while (true) {
        let input = prompt(`${chalk.blueBright('>')} `);
        if(input === 'exit') break;
    
        console.log(program('<STDIN>', input));
    }
}

export default repl;