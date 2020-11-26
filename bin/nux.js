#!/usr/bin/env node

import repl from '../src/repl.js';
import program from '../src/program.js';
import { promises as fs } from 'fs'

const [command, ...args] = process.argv.slice(2);

if(command) {
    fs.readFile(command, 'utf-8')
    .then(result => {
        const res = program('index.nux', result);
        console.log(res);
    })
} else {
    repl();
}