#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log('gendiff: comparing', filepath1, 'and', filepath2);
  });

program.parse();
