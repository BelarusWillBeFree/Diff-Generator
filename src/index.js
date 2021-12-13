import libPath from 'path';
import { readFileSync } from 'fs';
import formatter from './formatters/index.js';
import getDiff from './diffComp.js';
import parseData from './parsers.js';

const getDataFromFile = (path) => {
  const resolvedPath = libPath.resolve(path);
  const data = readFileSync(resolvedPath, 'utf8');
  const extName = libPath.extname(resolvedPath).slice(1);
  return parseData(data, extName);
};

const gendiff = (path1, path2, format) => {
  const parseFile1 = getDataFromFile(path1);
  const parseFile2 = getDataFromFile(path2);
  const diff = getDiff(parseFile1, parseFile2);
  return formatter(diff, format);
};

export default gendiff;
