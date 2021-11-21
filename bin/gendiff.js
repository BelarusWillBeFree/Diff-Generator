#!/usr/bin/env node
import { Command } from 'commander';
import getDiffObj from '../src/index.js';

const main = () => {
  const program = new Command();
  program.description('Compares two configuration files and shows a difference');
  program.version('0.0.1', '-V, --version', 'output the version number');
  program.option('-f, --format [type]', 'output format', 'stylish');
  program.argument('<filepath1>');
  program.argument('<filepath2>');
  program.action((path1, path2) => {
    const diffresult = getDiffObj(path1, path2, program.opts().format);
    console.log(diffresult);
    return diffresult;
  });
  program.parse(process.argv);
};

main();

export default getDiffObj;
