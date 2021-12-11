import path from 'path';
import { readFileSync } from 'fs';
import formatter from './formatters/index.js';
import getDiff from './diffComp.js';
import parseData from './parsers.js';

const getExtName = (pathForExt) => {
  const resolvePath = path.normalize(pathForExt);
  const onlyPath = path.extname(resolvePath);
  return onlyPath.split('.')[1];
};

const getDataFromFile = (inputPath) => {
  const resolvePath = path.resolve(inputPath);//resolve()
  return readFileSync(resolvePath, 'utf8');
};

const gendiff = (path1, path2, format) => {
  const data1 = getDataFromFile(path1);
  const data2 = getDataFromFile(path2);
  const extName1 = getExtName(path1);
  const extName2 = getExtName(path2);
  const parseFile1 = parseData(data1, extName1);
  const parseFile2 = parseData(data2, extName2);
  const diff = getDiff(parseFile1, parseFile2);
  return formatter(diff, format);
};

export default gendiff;
