#!/usr/bin/env node
import diffObjects from './diff.js';
import { Command } from 'commander';
import path from 'path';
import { openSync, closeSync, readFileSync, existsSync } from 'fs';

const getJSONByPath = (inputPath) => {
  try {
   // const resolvePath = path.resolve(inputPath);
    const resolvePath =path.normalize(inputPath);
    const extname = path.extname(resolvePath);
    if (existsSync(resolvePath) && extname === '.json') {
      const dataFile = readFileSync(resolvePath,'utf8');
      return JSON.parse(dataFile);
    }
    return {};
  } catch (err) {
    console.log(`error ${err}`);
  }
};

const getDiffStr = (path1, path2) =>{
  const obj1 = getJSONByPath(path1);
  const obj2 = getJSONByPath(path2);
  const strResult = diffObjects(obj1, obj2);
  console.log(strResult);
  return strResult;
};

const gendiffs = (...inputParamPath) =>{
  if (inputParamPath.length === 2) {
    return getDiffStr(inputParamPath[0], inputParamPath[1]);
  }
  const program = new Command();
  program.description('Compares two configuration files and shows a difference')
  program.version('0.0.1', '-V, --version', 'output the version number');
  program.option('-f, --format [type]','output format');
  program.argument('<filepath1>');
  program.argument('<filepath2>');
  program.action((path1, path2) =>{
    return getDiffStr(path1, path2);
  });
  program.parse(process.argv);
 
}
export default gendiffs;

