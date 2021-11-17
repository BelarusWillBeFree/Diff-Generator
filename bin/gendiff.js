#!/usr/bin/env node
import getDiffObj from '../src/index.js';
import { Command } from 'commander';

const main = () =>{
  const program = new Command();
  program.description('Compares two configuration files and shows a difference')
  program.version('0.0.1', '-V, --version', 'output the version number');
  program.option('-f, --format [type]','output format', 'stylish');
  program.argument('<filepath1>');
  program.argument('<filepath2>');
  program.action((path1, path2) =>{
    switch (program.opts().format){
      case 'plain':
        const diffTxtPlain = getDiffObj(path1, path2, 'plain');
        console.log(diffTxtPlain);
        return diffTxtPlain;
      default:
        const diffTxtStylish = getDiffObj(path1, path2);
        console.log(diffTxtStylish);
        return diffTxtStylish;
    }
  });
  program.parse(process.argv);
}

main();

export default getDiffObj;
