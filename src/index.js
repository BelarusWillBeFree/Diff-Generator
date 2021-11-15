import diffComp from './diffComp.js';
import parseData from './parsers.js';
import path from 'path';
import { readFileSync, existsSync } from 'fs';
import stylish from '../src/stylish.js';

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

const gendiff = (...inputParamPath) =>{
  const infoFile1 = getDataFromFile(inputParamPath[0]);
  const infoFile2 = getDataFromFile(inputParamPath[1]);
  const parseFile1 = parseData(infoFile1);
  const parseFile2 = parseData(infoFile2);
  const objResult = diffComp(parseFile1, parseFile2);
  if (inputParamPath.length > 2) {
    switch (inputParamPath[2]){
      default:
        return stylish(objResult);
    }
  };
  return objResult;
}

export default gendiff;
