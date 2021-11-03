import gendiff from '../bin/gendiff.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');


test('gendiffJSON', () => {
  const sourcePath1 = getFixturePath('file1.json');
  const sourcePath2 = getFixturePath('file2.json');
  const fixResultFile = readFile('fixturefile1.json');
  expect(gendiff(sourcePath1, sourcePath2)).toEqual(fixResultFile);
  });
test('gendiffYAML', () => {
  const sourcePath1 = getFixturePath('file1.yaml');
  const sourcePath2 = getFixturePath('file2.yaml');
  const fixResultFile = readFile('fixturefile1.json');
  expect(gendiff(sourcePath1, sourcePath2)).toEqual(fixResultFile);
});
test('existOnlyFirstFile', () => {
  const sourcePath1 = getFixturePath('file1.json');
  const sourcePath2 = getFixturePath('file2.json1');
  const fixResultFile = readFile('onlyFirstFile.json');
  expect(gendiff(sourcePath1, sourcePath2)).toEqual(fixResultFile);
}); 
test('existOnlySecondFile', () => {
  const sourcePath1 = getFixturePath('file1.json1');
  const sourcePath2 = getFixturePath('file2.json');
  const fixResultFile = readFile('onlySecondFile.json');
  expect(gendiff(sourcePath1, sourcePath2)).toEqual(fixResultFile);
}); 