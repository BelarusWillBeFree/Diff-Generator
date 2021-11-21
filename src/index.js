import path from 'path';
import { readFileSync, existsSync } from 'fs';
import formatter from './formatters/index.js';
import getDiff from './diffComp.js';
import parseData from './parsers.js';

const getDataFromFile = (inputPath) => {
  try {
    const resolvePath = path.normalize(inputPath);
    const extname = path.extname(resolvePath);
    if (existsSync(resolvePath)) {
      return { data: readFileSync(resolvePath, 'utf8'), ext: extname };
    }
    throw new Error(`file ${resolvePath} is not exist`);
  } catch (err) {
    throw new Error(`error ${err}`);
  }
};

const gendiff = (...inputParam) => {
  const infoFile1 = getDataFromFile(inputParam[0]);
  const infoFile2 = getDataFromFile(inputParam[1]);
  const parseFile1 = parseData(infoFile1);
  const parseFile2 = parseData(infoFile2);
  const diff = getDiff(parseFile1, parseFile2);
  if (inputParam.length > 2) {
    return formatter(diff, inputParam[2]);
  }
  return formatter(diff);
};

export default gendiff;
