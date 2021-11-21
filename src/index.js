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

const gendiff = (path1, path2, format) => {
  const infoFile1 = getDataFromFile(path1);
  const infoFile2 = getDataFromFile(path2);
  const parseFile1 = parseData(infoFile1);
  const parseFile2 = parseData(infoFile2);
  const diff = getDiff(parseFile1, parseFile2);
  return formatter(diff, format);
};

export default gendiff;
