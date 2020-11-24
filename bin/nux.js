#!/usr/bin/env node

import program from '../src/program.js';
import { promises as fs } from 'fs'

const [command, ...args] = process.argv.slice(2);


fs.readFile('index.nux', 'utf-8')
.then(result => {
    program('index.nux', result);
})