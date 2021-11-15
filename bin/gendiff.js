#!/usr/bin/env node
import getDiffObj from '../src/index.js';
import { Command } from 'commander';
//import stylish from '../src/stylish.js';

const main = () =>{
  const program = new Command();
  program.description('Compares two configuration files and shows a difference')
  program.version('0.0.1', '-V, --version', 'output the version number');
  program.option('-f, --format [type]','output format', 'stylish');
  program.argument('<filepath1>');
  program.argument('<filepath2>');
  program.action((path1, path2) =>{
    switch (program.opts().format){

      default:
        const diffObject = getDiffObj(path1, path2, 'stylish');
        
        console.log(diffObject);
        return diffObject;
      }
//    if (program.opts().format === 'stylish'){
//      const formatDefaultValue = stylish(diffObject);
//      console.log(formatDefaultValue);
//      return formatDefaultValue;
//    }
  });
  program.parse(process.argv);
}

main();

export default getDiffObj;
