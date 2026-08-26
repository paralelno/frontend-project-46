#!/usr/bin/env node
import { program } from 'commander';
import parse from './src/parser.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    console.log('gendiff: parsed', filepath1, 'and', filepath2);
    console.log('data1:', JSON.stringify(data1));
    console.log('data2:', JSON.stringify(data2));
  });

program.parse();
