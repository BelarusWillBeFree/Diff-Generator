#!/usr/bin/env node

import diffObjects from './diff.js';
import { Command } from 'commander';
import parseData from './parsers.js';
import path from 'path';
import { readFileSync, existsSync } from 'fs';

const getDataFromFile = (inputPath) => {
  try {
    const resolvePath =path.normalize(inputPath);
    const extname = path.extname(resolvePath);
    if (existsSync(resolvePath)) {
      return {data:readFileSync(resolvePath,'utf8'), ext:extname};
    }
    return {};
  } catch (err) {
    console.log(`error ${err}`);
  }
};
const getDiffStr = (path1, path2) =>{
  const infoFile1 = getDataFromFile(path1);
  const infoFile2 = getDataFromFile(path2);
  const parseFile1 = parseData(infoFile1);
  const parseFile2 = parseData(infoFile2);
  const strResult = diffObjects(parseFile1, parseFile2);
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
    const diffStr = getDiffStr(path1, path2);
    console.log(diffStr);
    return diffStr;
  });
  program.parse(process.argv);
}

export default gendiffs;
